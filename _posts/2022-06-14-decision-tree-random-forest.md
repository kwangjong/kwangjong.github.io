---
layout: post
title: "Data Science Review: Intro to ML"
tags: blog, datascience, machinelearning
date: 2022-06-14 14:05 +0900
---

![intro-to-ml](https://i.imgur.com/j0FQ9Tn.png)

## How Models Work

Fundamentals of machine learning models are finding patterns from dataset and making prediction using the pattern they learned. The process of finding pattern from given data set is called **fitting or training**. The data used to **fit** the model is called **training data**. After the model has been **fit**, you can apply new data to make **prediction**.

## Decision Tree

Decision tree is one of machine learning models that uses tree structure to construct prediction model. Take a look at the diagram below.

![decision-tree](https://i.imgur.com/phyQdr6.png)

The model above goes through series of factors that "splits" into predictions. You can construct "deeper" decision trees by capturing more factors.


## Model Validation

Model validation is a process of evalutating your model to see how good it is. A model is evaluated by comparing its predictions to the actual values. The dataset used to evaluate the model is called **validation data**. It is important not to use same data for training and validation training because it can lead to **overfitting**.

* **Overfitting** is a phenomemenon where the model matches the training data perfectly, but does poorly in validation. 

* **Underfitting** is when model fails to capture critical patterns in the data and does poorly in both training and validation data.

![mae](https://i.imgur.com/8H7FOGm.png)


## Random Forest

Random Forest are prediction model consisting multitple decision trees. It makes prediction my averaging the prediciton of each component tree. It generally produces more accurate prediction than a single decision tree.

![rf](https://i.imgur.com/XW9kBrr.png)


## Handling Missing Values
1) drop columns with missing values
   - model uses a lot of potentially useful information
``` python   
# Get names of columns with missing values
cols_with_missing = [col for col in X_train.columns
                     if X_train[col].isnull().any()]

# Drop columns in training and validation data
reduced_X_train = X_train.drop(cols_with_missing, axis=1)
reduced_X_valid = X_valid.drop(cols_with_missing, axis=1)

print("MAE from Approach 1 (Drop columns with missing values):")
print(score_dataset(reduced_X_train, reduced_X_valid, y_train, y_valid))
```

2) imputation
   - imputed value won't be exact, but it produces more accurate model than dropping columns

``` python
from sklearn.impute import SimpleImputer

# Imputation
my_imputer = SimpleImputer()
imputed_X_train = pd.DataFrame(my_imputer.fit_transform(X_train))
imputed_X_valid = pd.DataFrame(my_imputer.transform(X_valid))

# Imputation removed column names; put them back
imputed_X_train.columns = X_train.columns
imputed_X_valid.columns = X_valid.columns

print("MAE from Approach 2 (Imputation):")
print(score_dataset(imputed_X_train, imputed_X_valid, y_train, y_valid))
```

3) extension to imputation
   - in some cases, this can be a meaningful improvement, but in other cases it doesn't help at all

``` python
# Make copy to avoid changing original data (when imputing)
X_train_plus = X_train.copy()
X_valid_plus = X_valid.copy()

# Make new columns indicating what will be imputed
for col in cols_with_missing:
    X_train_plus[col + '_was_missing'] = X_train_plus[col].isnull()
    X_valid_plus[col + '_was_missing'] = X_valid_plus[col].isnull()

# Imputation
my_imputer = SimpleImputer()
imputed_X_train_plus = pd.DataFrame(my_imputer.fit_transform(X_train_plus))
imputed_X_valid_plus = pd.DataFrame(my_imputer.transform(X_valid_plus))

# Imputation removed column names; put them back
imputed_X_train_plus.columns = X_train_plus.columns
imputed_X_valid_plus.columns = X_valid_plus.columns

print("MAE from Approach 3 (An Extension to Imputation):")
print(score_dataset(imputed_X_train_plus, imputed_X_valid_plus, y_train, y_valid))
```

## Links
* [Link to my notebook](---)
* [Intro to ML Course on Kaggle](https://www.kaggle.com/learn/intro-to-machine-learning)
* [Intermediate ML Course on Kaggle](https://www.kaggle.com/learn/intermediate-machine-learning)
