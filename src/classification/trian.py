import torch
import torch.nn as nn
import torch.optim as optim
from torchvision import datasets, transforms, models
from torch.utils.data import DataLoader
import os

# ======================
# Configuration
# ======================
DEVICE = torch.device("mps" if torch.backends.mps.is_available() else "cpu")
BATCH_SIZE = 32
EPOCHS = 30
LR = 1e-4
IMG_SIZE = 224

# Dataset Path
DATA_DIR = "/Users/ravikant/Desktop/Car_Damage_Detection_for_Insurance_Automation/Datasets/Damage Vs No-Damage"

# ======================
# Model Save Directory
# ======================
BASE_DIR = os.path.dirname(os.path.abspath(__file__))

MODEL_DIR = os.path.join(BASE_DIR, "../../models")

# create models folder if not present
os.makedirs(MODEL_DIR, exist_ok=True)

MODEL_PATH = os.path.join(MODEL_DIR, "best_binary_model.pth")

# ======================
# Transforms
# ======================
train_transform = transforms.Compose([
    transforms.Resize((IMG_SIZE, IMG_SIZE)),
    transforms.RandomHorizontalFlip(),
    transforms.RandomRotation(10),
    transforms.ColorJitter(brightness=0.2, contrast=0.2),
    transforms.ToTensor(),
    transforms.Normalize(
        mean=[0.485, 0.456, 0.406],
        std=[0.229, 0.224, 0.225]
    )
])

val_transform = transforms.Compose([
    transforms.Resize((IMG_SIZE, IMG_SIZE)),
    transforms.ToTensor(),
    transforms.Normalize(
        mean=[0.485, 0.456, 0.406],
        std=[0.229, 0.224, 0.225]
    )
])

# ======================
# Dataset & Loader
# ======================
train_dataset = datasets.ImageFolder(
    root=os.path.join(DATA_DIR, "training"),
    transform=train_transform
)

val_dataset = datasets.ImageFolder(
    root=os.path.join(DATA_DIR, "validation"),
    transform=val_transform
)

train_loader = DataLoader(
    train_dataset,
    batch_size=BATCH_SIZE,
    shuffle=True
)

val_loader = DataLoader(
    val_dataset,
    batch_size=BATCH_SIZE,
    shuffle=False
)

print("Classes detected:", train_dataset.classes)

# ======================
# Model (MobileNetV3)
# ======================
model = models.mobilenet_v3_small(pretrained=True)

# Freeze all layers
for param in model.parameters():
    param.requires_grad = False

# Unfreeze last feature layers
for param in model.features[-2:].parameters():
    param.requires_grad = True

# Replace classifier
model.classifier[3] = nn.Linear(
    model.classifier[3].in_features,
    2
)

model = model.to(DEVICE)

# ======================
# Loss & Optimizer
# ======================
criterion = nn.CrossEntropyLoss()

optimizer = optim.Adam(
    filter(lambda p: p.requires_grad, model.parameters()),
    lr=LR
)

# ======================
# Training Loop
# ======================
best_val_acc = 0

for epoch in range(EPOCHS):

    model.train()

    correct = 0
    total = 0

    for images, labels in train_loader:

        images = images.to(DEVICE)
        labels = labels.to(DEVICE)

        optimizer.zero_grad()

        outputs = model(images)

        loss = criterion(outputs, labels)

        loss.backward()

        optimizer.step()

        _, preds = torch.max(outputs, 1)

        correct += (preds == labels).sum().item()

        total += labels.size(0)

    train_acc = correct / total

    # ======================
    # Validation
    # ======================
    model.eval()

    val_correct = 0
    val_total = 0

    with torch.no_grad():

        for images, labels in val_loader:

            images = images.to(DEVICE)
            labels = labels.to(DEVICE)

            outputs = model(images)

            _, preds = torch.max(outputs, 1)

            val_correct += (preds == labels).sum().item()

            val_total += labels.size(0)

    val_acc = val_correct / val_total

    print(f"Epoch [{epoch+1}/{EPOCHS}] "
          f"Train Acc: {train_acc:.4f} "
          f"Val Acc: {val_acc:.4f}")

    # ======================
    # Save Best Model
    # ======================
    if val_acc > best_val_acc:

        best_val_acc = val_acc

        torch.save(model.state_dict(), MODEL_PATH)

        print(f"Best model saved at: {MODEL_PATH}")

print("Training Finished!")