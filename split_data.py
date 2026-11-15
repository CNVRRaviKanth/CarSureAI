import os
import random
import shutil

base_path = "Datasets/damage_location"

image_dir = os.path.join(base_path, "train/images")
label_dir = os.path.join(base_path, "train/labels")

val_image_dir = os.path.join(base_path, "valid/images")
val_label_dir = os.path.join(base_path, "valid/labels")

os.makedirs(val_image_dir, exist_ok=True)
os.makedirs(val_label_dir, exist_ok=True)

images = os.listdir(image_dir)
random.shuffle(images)

split_ratio = 0.2
split_index = int(len(images) * split_ratio)

val_images = images[:split_index]

for img in val_images:
    label = img.replace(".jpg", ".txt").replace(".png", ".txt")

    shutil.move(os.path.join(image_dir, img),
                os.path.join(val_image_dir, img))

    shutil.move(os.path.join(label_dir, label),
                os.path.join(val_label_dir, label))

print("✅ Validation set created!")