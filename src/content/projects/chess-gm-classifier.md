---
title: Chess Grandmaster Classifier
summary: A convolutional neural network that tells apart photos of my three favourite grandmasters — Magnus Carlsen, Hikaru Nakamura and Nodirbek Abdusattorov.
year: 2025
context: Personal project
team: Solo
role: Dataset, model and training
metrics:
  - value: '3'
    label: Grandmasters to tell apart
  - value: '297'
    label: Photos in the dataset
  - value: '6.5M'
    label: Parameters, trained from scratch
tags:
  - TensorFlow
  - Keras
  - CNN
  - Computer vision
repo: https://github.com/h7karu/chess_GM_classifier
art: board
order: 3
---

## Why

Chess is my favourite game, and Abdusattorov, Carlsen and Nakamura are my favourite
players to watch. Teaching a model to recognise them was a fun excuse to build an
image classifier end to end — from assembling a dataset to naming the player in a
photo it has never seen.

## How it works

- **Data.** 297 photos across three classes, resized to 256 × 256, scaled to [0, 1]
  and split 70 / 10 / 20 into training, validation and test batches.
- **Augmentation.** Random horizontal flips and small rotations, so the model can't
  memorise exact poses.
- **Architecture.** Four convolution blocks (16 → 32 → 64 → 128 filters, 3 × 3
  kernels with max-pooling), dropout on the deeper blocks, a 256-unit dense layer
  and a three-way softmax — about 6.5 million parameters.
- **Training.** 40 epochs with Adam and sparse categorical cross-entropy, logged to
  TensorBoard.

## Results

By the final epoch validation accuracy reaches 96.9%, and the model gets 8 of the 9
images in its test batch right. A small helper, `chessclassify()`, takes any image
file, shows it and names the grandmaster.

## What I'd do differently

**Fix the evaluation first.** The dataset reshuffles on every pass, so splitting it
with `take` and `skip` lets images drift between the training and test splits from
one epoch to the next — and the test split ended up as a single batch of nine
images. Those numbers are an encouraging signal, not a reliable estimate. Splitting
the files on disk before training would give an honest one.

**Then spend the capacity better.** 6.4 of the model's 6.5 million parameters sit in
the single step from the flattened feature maps to the dense layer — a lot to learn
from under 300 images. Fine-tuning a pretrained backbone would likely do better with
less data, and cropping to faces first would keep the model looking at the players
rather than the backgrounds.
