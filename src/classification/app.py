import streamlit as st
import torch
import torch.nn as nn

from torchvision import models, transforms
from PIL import Image

from ultralytics import YOLO

# =====================================
# CONFIG
# =====================================

CLS_MODEL_PATH = "models/best_binary_model.pth"
YOLO_MODEL_PATH = "models/best.pt"
SEVERITY_MODEL_PATH = "models/damage_severity.pth"

DEVICE = torch.device(
    "mps" if torch.backends.mps.is_available() else "cpu"
)

# =====================================
# CLASS NAMES
# =====================================

classification_classes = [
    "00-damage",
    "01-whole"
]

severity_classes = [
    "minor",
    "moderate",
    "severe"
]

# =====================================
# IMAGE TRANSFORM
# =====================================

transform = transforms.Compose([

    transforms.Resize((224, 224)),

    transforms.ToTensor(),

    transforms.Normalize(
        mean=[0.485, 0.456, 0.406],
        std=[0.229, 0.224, 0.225]
    )
])

# =====================================
# LOAD DAMAGE CLASSIFICATION MODEL
# =====================================

@st.cache_resource

def load_classification_model():

    model = models.mobilenet_v3_small(
        pretrained=False
    )

    model.classifier[3] = nn.Linear(
        model.classifier[3].in_features,
        2
    )

    model.load_state_dict(
        torch.load(
            CLS_MODEL_PATH,
            map_location=DEVICE
        )
    )

    model.to(DEVICE)
    model.eval()

    return model

# =====================================
# LOAD YOLO MODEL
# =====================================

@st.cache_resource

def load_yolo_model():

    model = YOLO(YOLO_MODEL_PATH)

    return model

# =====================================
# LOAD SEVERITY MODEL
# =====================================

@st.cache_resource

def load_severity_model():

    model = models.efficientnet_b0(
        pretrained=False
    )

    model.classifier[1] = nn.Linear(
        model.classifier[1].in_features,
        3
    )

    model.load_state_dict(
        torch.load(
            SEVERITY_MODEL_PATH,
            map_location=DEVICE
        )
    )

    model.to(DEVICE)
    model.eval()

    return model

# =====================================
# LOAD ALL MODELS
# =====================================

classification_model = load_classification_model()
yolo_model = load_yolo_model()
severity_model = load_severity_model()

# =====================================
# DAMAGE CLASSIFICATION
# =====================================

def classify_damage(image):

    img = transform(image).unsqueeze(0).to(DEVICE)

    with torch.no_grad():

        outputs = classification_model(img)

        probs = torch.nn.functional.softmax(
            outputs,
            dim=1
        )

        confidence, pred = torch.max(
            probs,
            1
        )

    return (
        classification_classes[pred.item()],
        confidence.item()
    )

# =====================================
# DAMAGE DETECTION
# =====================================

def detect_damage(image):

    results = yolo_model(
        image,
        conf=0.3
    )

    return results

# =====================================
# CROP LARGEST DAMAGE REGION
# =====================================

def crop_damage_region(image, boxes):

    if boxes is None or len(boxes) == 0:
        return None

    image_width, image_height = image.size

    largest_area = 0
    best_box = None

    for box in boxes:

        coords = box.xyxy[0].cpu().numpy()

        x1, y1, x2, y2 = coords

        area = (x2 - x1) * (y2 - y1)

        if area > largest_area:

            largest_area = area
            best_box = coords

    if best_box is None:
        return None

    x1, y1, x2, y2 = best_box

    x1 = max(0, int(x1))
    y1 = max(0, int(y1))
    x2 = min(image_width, int(x2))
    y2 = min(image_height, int(y2))

    cropped_image = image.crop((x1, y1, x2, y2))

    return cropped_image

# =====================================
# SEVERITY PREDICTION
# =====================================

def predict_severity(image):

    img = transform(image).unsqueeze(0).to(DEVICE)

    with torch.no_grad():

        outputs = severity_model(img)

        probs = torch.nn.functional.softmax(
            outputs,
            dim=1
        )

        confidence, pred = torch.max(
            probs,
            1
        )

    return (
        severity_classes[pred.item()],
        confidence.item()
    )

# =====================================
# STREAMLIT UI
# =====================================

st.set_page_config(
    page_title="Car Damage Analysis",
    page_icon="🚗",
    layout="centered"
)

st.title("🚗 Car Damage Analysis System")

st.write(
    "Upload a car image for AI-powered damage analysis."
)

uploaded_file = st.file_uploader(
    "Upload Car Image",
    type=["jpg", "jpeg", "png"]
)

# =====================================
# MAIN PIPELINE
# =====================================

if uploaded_file is not None:

    image = Image.open(
        uploaded_file
    ).convert("RGB")

    st.image(
        image,
        caption="Uploaded Image",
        use_container_width=True
    )

    if st.button("Analyze"):

        with st.spinner("Running AI Pipeline..."):

            # =================================
            # MODULE 1
            # =================================

            st.divider()

            st.subheader(
                "Module 1: Damage Classification"
            )

            damage_label, damage_confidence = (
                classify_damage(image)
            )

            if damage_label == "01-whole":

                st.success(
                    f"✅ No Damage Detected\n\n"
                    f"Confidence: "
                    f"{damage_confidence*100:.2f}%"
                )

            else:

                st.error(
                    f"🚨 Damage Detected\n\n"
                    f"Confidence: "
                    f"{damage_confidence*100:.2f}%"
                )

                # =================================
                # MODULE 2
                # =================================

                st.divider()

                st.subheader(
                    "Module 2: Damage Localization"
                )

                results = detect_damage(image)

                boxes = results[0].boxes

                if boxes is None or len(boxes) == 0:

                    st.warning(
                        "⚠️ Unable to detect damage region."
                    )

                else:

                    st.success(
                        f"Detected Damage Regions: {len(boxes)}"
                    )

                    plotted_image = results[0].plot()

                    st.image(
                        plotted_image,
                        caption="Damage Localization",
                        use_container_width=True
                    )

                    # =================================
                    # DAMAGE CROP
                    # =================================

                    cropped_damage = crop_damage_region(
                        image,
                        boxes
                    )

                    if cropped_damage is not None:

                        st.divider()

                        st.subheader(
                            "Cropped Damage Region"
                        )

                        st.image(
                            cropped_damage,
                            caption="Detected Damage Crop",
                            use_container_width=True
                        )

                        # =============================
                        # MODULE 3
                        # =============================

                        st.divider()

                        st.subheader(
                            "Module 3: Severity Prediction"
                        )

                        severity_label, severity_confidence = (
                            predict_severity(cropped_damage)
                        )

                        if severity_label == "minor":

                            st.success(
                                f"🟢 Severity: MINOR\n\n"
                                f"Confidence: "
                                f"{severity_confidence*100:.2f}%"
                            )

                        elif severity_label == "moderate":

                            st.warning(
                                f"🟠 Severity: MODERATE\n\n"
                                f"Confidence: "
                                f"{severity_confidence*100:.2f}%"
                            )

                        else:

                            st.error(
                                f"🔴 Severity: SEVERE\n\n"
                                f"Confidence: "
                                f"{severity_confidence*100:.2f}%"
                            )

## streamlit run src/classification/app.py