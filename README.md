# Consumer Complaint Text Classification 📝

## Table of Contents

1. [Project Overview](#project-overview)
2. [Problem Statement](#problem-statement)
3. [Dataset](#dataset)
4. [Preprocessing](#preprocessing)
5. [Modeling](#modeling)

   * [RNN](#rnn)
   * [BiLSTM](#bilstm)
   * [BERT](#bert)
6. [Evaluation](#evaluation)
7. [Results](#results)
8. [Conclusion](#conclusion)
9. [Future Work](#future-work)

---

## Project Overview 🌟

This project focuses on automatically classifying consumer complaints into different product categories using Natural Language Processing (NLP) techniques. It leverages deep learning models such as **RNN**, **BiLSTM**, and Transformer-based models (**BERT**) for accurate text classification.

---

## Problem Statement ❗

Consumers often submit complaints regarding financial products such as mortgages, loans, and credit reporting issues.
Manually categorizing these complaints is **time-consuming** and **error-prone**.
The goal of this project is to:

* ✅ Automatically classify consumer complaints into correct product categories
* ⏱️ Improve processing efficiency for consumer protection agencies
* 📊 Demonstrate the performance of sequential and transformer-based models on textual data

---

## Dataset 📂

The dataset is sourced from the **Consumer Financial Protection Bureau (CFPB)** open data repository.

**Key points:**

* Contains consumer complaints across multiple financial products.
* Sample used for this project: **2000 rows** (can be scaled for better performance).
* Columns used:

  * `product`: The category of the complaint
  * `consumer complaint narrative`: Text of the complaint

**Selected categories:**

* Credit reporting, repair, or other
* Debt collection
* Consumer Loan
* Mortgage

---

## Preprocessing 🧹

Text preprocessing is crucial for NLP tasks. The following steps were performed:

1. 🔡 Lowercasing all text
2. 🚫 Removing URLs, emails, HTML tags, and numbers
3. ✍️ Expanding contractions (e.g., “can't” → “cannot”)
4. 🧽 Removing punctuation, emojis, and extra whitespace
5. 🔗 Tokenization (using simple split or NLTK)
6. 🛑 Stopword removal (including custom financial stopwords)
7. ✨ Lemmatization to reduce words to their base forms

After preprocessing, the text was vectorized using **TF-IDF** or tokenized sequences for deep learning models.

---

## Modeling 🤖

### RNN

* **Architecture**: Embedding layer → Simple RNN → Dense output layer
* **Input**: Tokenized complaint sequences
* **Loss Function**: Categorical Crossentropy
* **Optimizer**: Adam
* Handles sequential patterns in text but may struggle with long-term dependencies.

### BiLSTM

* **Architecture**: Embedding layer → Bidirectional LSTM → Dense output layer
* **Advantage**: Captures both past and future context in text sequences.
* More effective than simple RNNs for longer complaint narratives.

### BERT

* **Architecture**: Pretrained BERT encoder → Dense classification layer
* **Input**: Tokenized and padded sequences using BERT tokenizer
* **Advantage**: Transformer-based contextual embeddings capture rich semantic information.
* Typically achieves the best performance but requires more computational resources.

---

## Evaluation 📊

Models were evaluated using:

* **Accuracy**
* **Precision, Recall, F1-Score**
* **Confusion Matrix**

---

## Results 🏆

| Model     | Accuracy (%) |
| --------- | ------------ |
| 🧠 RNN    | **91.37%**   |
| 🔁 BiLSTM | **94.22%**   |
| 🤖 BERT   | **94.79%**   |

Confusion matrices can be included as images below:

```
<img width="749" height="610" alt="download" src="https://github.com/user-attachments/assets/46d6aff0-fe84-4c04-a37f-9c598a7f2aa5" />
<img width="891" height="347" alt="Screenshot 2025-10-19 002033" src="https://github.com/user-attachments/assets/5ca56e66-4d73-499b-9810-4077fe35ff50" />


```

### ⚖️ Class Imbalance Analysis

Even though the models achieved **high accuracy**, there exists a **significant class imbalance** in the dataset.

From the confusion matrix, it’s evident that:

* **“Credit reporting, repair, or other”** has a **very large number of samples**
* **“Consumer Loan”** is **highly underrepresented** (very few samples)
* The model tends to **predict the majority class** more frequently

This imbalance can cause misleadingly high accuracy but poor recall and precision for smaller classes like *Consumer Loan*.

### 🧩 Possible Solutions

Since the imbalance is **very large**, adding synthetic samples to smaller classes (like *Consumer Loan*) may not yield realistic data.
Instead, the **recommended approach** is:

* 🔻 **Reduce samples** from the dominant class (“Credit reporting, repair, or other”) to balance proportions.
* ⚖️ **Apply class weighting** in the loss function to penalize misclassification of smaller classes.
* 🔍 **Use balanced evaluation metrics** (Macro F1-score, Balanced Accuracy) for fair assessment.

---

## Conclusion ✅

* Deep learning models can effectively classify consumer complaints into product categories.
* **BiLSTM** and **BERT** outperform simple RNNs due to better handling of context and semantics.
* Despite high accuracy, the dataset suffers from **class imbalance**, heavily favoring one category.
* In such cases, **reducing dominant class samples** is more practical than oversampling minority classes, given the large count differences.

---

## Future Work 🚀

* Expand dataset to include more balanced samples across categories
* Experiment with class-weighted training for fairer learning
* Fine-tune domain-specific BERT models for financial complaint data
* Deploy as a **web app or REST API** for real-time classification 🌐

---
