import os
import torch
import torch.nn as nn
import torch.optim as optim

from torchvision import datasets, transforms, models
from torch.utils.data import DataLoader

# =====================================
# CONFIG
# =====================================

DEVICE = torch.device(
    "mps" if torch.backends.mps.is_available() else "cpu"
)

BATCH_SIZE = 32
EPOCHS = 30
LEARNING_RATE = 1e-5
IMG_SIZE = 224

DATASET_PATH = "Datasets/Damage Severity"

MODEL_SAVE_PATH = "models/damage_severity.pth"

# =====================================
# TRAIN TRANSFORMS
# =====================================

train_transform = transforms.Compose([

    transforms.Resize((IMG_SIZE, IMG_SIZE)),

    transforms.RandomHorizontalFlip(),

    transforms.RandomRotation(15),

    transforms.ColorJitter(
        brightness=0.3,
        contrast=0.3,
        saturation=0.3
    ),

    transforms.RandomAffine(
        degrees=0,
        translate=(0.1, 0.1)
    ),

    transforms.ToTensor(),

    transforms.Normalize(
        mean=[0.485, 0.456, 0.406],
        std=[0.229, 0.224, 0.225]
    )
])

# =====================================
# VALIDATION TRANSFORMS
# =====================================

val_transform = transforms.Compose([

    transforms.Resize((IMG_SIZE, IMG_SIZE)),

    transforms.ToTensor(),

    transforms.Normalize(
        mean=[0.485, 0.456, 0.406],
        std=[0.229, 0.224, 0.225]
    )
])

# =====================================
# DATASETS
# =====================================

train_dataset = datasets.ImageFolder(
    root=os.path.join(
        DATASET_PATH,
        "training"
    ),
    transform=train_transform
)

val_dataset = datasets.ImageFolder(
    root=os.path.join(
        DATASET_PATH,
        "validation"
    ),
    transform=val_transform
)

# =====================================
# DATALOADERS
# =====================================

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

print("\nClasses Found:")
print(train_dataset.classes)

# =====================================
# LOAD EFFICIENTNET
# =====================================

model = models.efficientnet_b0(
    pretrained=True
)

# =====================================
# FREEZE ALL LAYERS
# =====================================

for param in model.features.parameters():
    param.requires_grad = False

# =====================================
# UNFREEZE LAST TWO BLOCKS
# =====================================

for param in model.features[-2:].parameters():
    param.requires_grad = True

# =====================================
# REPLACE CLASSIFIER
# =====================================

model.classifier[1] = nn.Linear(
    model.classifier[1].in_features,
    3
)

model = model.to(DEVICE)

# =====================================
# LOSS FUNCTION
# =====================================

criterion = nn.CrossEntropyLoss()

# =====================================
# OPTIMIZER
# =====================================

optimizer = optim.Adam(
    filter(
        lambda p: p.requires_grad,
        model.parameters()
    ),
    lr=LEARNING_RATE
)

# =====================================
# TRAINING LOOP
# =====================================

best_val_acc = 0.0

for epoch in range(EPOCHS):

    # =================================
    # TRAINING
    # =================================

    model.train()

    train_correct = 0
    train_total = 0
    train_loss = 0.0

    for images, labels in train_loader:

        images = images.to(DEVICE)
        labels = labels.to(DEVICE)

        optimizer.zero_grad()

        outputs = model(images)

        loss = criterion(outputs, labels)

        loss.backward()

        optimizer.step()

        train_loss += loss.item()

        _, preds = torch.max(outputs, 1)

        train_correct += (
            preds == labels
        ).sum().item()

        train_total += labels.size(0)

    train_acc = train_correct / train_total

    # =================================
    # VALIDATION
    # =================================

    model.eval()

    val_correct = 0
    val_total = 0
    val_loss = 0.0

    with torch.no_grad():

        for images, labels in val_loader:

            images = images.to(DEVICE)
            labels = labels.to(DEVICE)

            outputs = model(images)

            loss = criterion(outputs, labels)

            val_loss += loss.item()

            _, preds = torch.max(outputs, 1)

            val_correct += (
                preds == labels
            ).sum().item()

            val_total += labels.size(0)

    val_acc = val_correct / val_total

    # =================================
    # PRINT METRICS
    # =================================

    print(f"\nEpoch [{epoch+1}/{EPOCHS}]")

    print(
        f"Train Loss: {train_loss:.4f}"
    )

    print(
        f"Train Accuracy: {train_acc:.4f}"
    )

    print(
        f"Validation Loss: {val_loss:.4f}"
    )

    print(
        f"Validation Accuracy: {val_acc:.4f}"
    )

    # =================================
    # SAVE BEST MODEL
    # =================================

    if val_acc > best_val_acc:

        best_val_acc = val_acc

        torch.save(
            model.state_dict(),
            MODEL_SAVE_PATH
        )

        print("✅ Best model saved!")

# =====================================
# TRAINING COMPLETE
# =====================================

print("\n🎉 Training Complete!")

print(
    f"Best Validation Accuracy: "
    f"{best_val_acc:.4f}"
)

## python src/severity/train.py