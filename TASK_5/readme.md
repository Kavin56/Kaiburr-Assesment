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

Consumers often submit complaints regarding financial products such as mortgages, loans, and credit reporting issues. Manually categorizing these complaints is time-consuming and error-prone. The goal of this project is to:

* Automatically classify consumer complaints into correct product categories ✅
* Improve processing efficiency for consumer protection agencies ⏱️
* Demonstrate the performance of sequential and transformer-based models on textual data 📊

---

## Dataset 📂

The dataset is sourced from the **Consumer Financial Protection Bureau (CFPB)** open data repository.

**Key points:**

* Contains consumer complaints across multiple financial products.
* Sample used for this project: **2000 rows** (can be scaled for better performance).
* Columns used:

  * `product`: The category of the complaint.
  * `consumer complaint narrative`: Text of the complaint.

**Selected categories:**

* Credit reporting, repair, or other
* Debt collection
* Consumer Loan
* Mortgage

---

## Preprocessing 🧹

Text preprocessing is crucial for NLP tasks. The following steps were performed:

1. Lowercasing all text 🔡
2. Removing URLs, emails, HTML tags, and numbers 🚫
3. Expanding contractions (e.g., “can't” → “cannot”) ✍️
4. Removing punctuation, emojis, and extra whitespace
5. Tokenization (using simple split or NLTK) 🔗
6. Stopword removal (including custom financial stopwords) 🛑
7. Lemmatization to reduce words to their base forms ✨

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

* **Accuracy**: Overall correct predictions / total predictions
* **Precision, Recall, F1-Score**: Class-wise performance metrics
* **Confusion Matrix**: Visual representation of predictions vs true labels

Example metrics (replace with your results):

| Model  | Accuracy |
| ------ | -------- |
| RNN    | 0.78     |
| BiLSTM | 0.83     |
| BERT   | 0.91     |

Confusion matrices can be included as images in the `Results` section.

---

## Results 🏆

Add your model results here:

* Confusion matrices for each model
* Sample predictions for unseen complaints
* Comparison of performance metrics (accuracy, F1-score)

> Example (insert actual image or markdown link):

```
![RNN Confusion Matrix](path_to_rnn_confusion.png)
![BiLSTM Confusion Matrix](path_to_bilstm_confusion.png)
![BERT Confusion Matrix](path_to_bert_confusion.png)
```

---

## Conclusion ✅

* Deep learning models can effectively classify consumer complaints into product categories.
* BiLSTM and BERT outperform simple RNNs due to better handling of context and semantics.
* Automated classification can improve complaint processing efficiency and reduce human effort.

---

## Future Work 🚀

* Expand dataset to include more categories for better generalization
* Use data augmentation techniques for text (e.g., synonym replacement, back-translation)
* Fine-tune BERT or other transformer models for domain-specific complaints
* Deploy as a web application or API for real-time complaint classification 🌐

---
