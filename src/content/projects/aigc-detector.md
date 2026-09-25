---
title: AI-Generated Image Detector
summary: Flags fully synthetic and locally tampered images from pixels alone, by fusing a LoRA-tuned Swin transformer with a CNN that reads the image's Fourier phase.
year: 2026
context: TikTok TechJam 2026
team: Team Regenerators · 5 people
role: Robustness evaluation, error analysis, baseline models and the live demo
metrics:
  - value: '0.947'
    label: AUROC on 2,000 held-out images
  - value: '0.936'
    label: Mean AUROC under JPEG, blur, resize and noise
  - value: '40k'
    label: Images in the fine-tuning set
tags:
  - PyTorch
  - Computer vision
  - LoRA
  - Swin Transformer
  - Gradio
repo: https://github.com/h7karu/regenerators_aigc_detector
art: spectrum
order: 1
---

## The problem

Image generators are now good enough that a quick look no longer settles whether a
photo is real. Our TechJam brief was to score how likely an image is to be
AI-generated from its **pixels alone**, covering two cases at once: images that are
fully synthetic, and real photographs where only a region has been edited.

## Approach

The model looks at every image in two complementary ways and fuses the result:

- **An RGB branch** — a Swin-Tiny transformer adapted with LoRA on its attention
  projections. LoRA keeps the trainable parameter count small, which is what made a
  two-stage fine-tune affordable on a single consumer GPU.
- **A Fourier-phase branch** — a compact CNN over sine and cosine maps of the FFT
  phase spectrum. Generators leave periodic upsampling traces in the frequency
  domain that are invisible in RGB and survive many local edits.

Training started on CIFAKE, then fine-tuned on a balanced 40,000-image subset of
SID-Set covering real, fully synthetic and tampered images. Every training step pairs
a clean view with a degraded one, so the objective rewards agreeing under JPEG, blur,
resizing and noise rather than accuracy on pristine images alone. At inference the
model averages five augmented views with a trimmed mean.

## My part

I owned the **robustness evaluation and error analysis**: measuring how the detector
holds up as images get compressed, blurred, resized and noised, and digging into the
cases it got confidently wrong. I also researched and implemented alternative models
to compare against, refined the final Gradio interface and recorded the live demo.

## Results

| Split                           | Images |  AUROC | Balanced accuracy |     F1 |
| ------------------------------- | -----: | -----: | ----------------: | -----: |
| SID model selection (five-view) |  2,000 | 0.9484 |            0.8825 | 0.8834 |
| SID holdout (clean)             |  2,000 | 0.9474 |            0.8680 | 0.8713 |

Across the full held-out degradation suite, mean AUROC is **0.936**, and even the
weakest condition stays above 0.90.

## What the error analysis showed

- **Heavy blur and 4× downscaling are the weak spots** (0.905 and 0.918 AUROC). Both
  destroy the high-frequency evidence the phase branch depends on — a structural
  limit of the design, not a tuning problem.
- **AUROC isn't the number that matters most.** At the deployed threshold the model
  catches 89.4% of AI images but still flags 15.8% of real ones. Anywhere a false
  accusation is costly, that false-positive rate is the binding constraint.
- **Test-time augmentation buys little.** Five views lift holdout AUROC from 0.943 to
  0.947 for five times the compute — a good candidate for distillation.

## Where I'd take it next

Calibrate the score so it reads as a probability, use SID-Set's tampering masks to
predict _where_ an image was edited rather than just whether, and run a proper
RGB-only / phase-only / fused ablation to pin down what the phase branch contributes.
