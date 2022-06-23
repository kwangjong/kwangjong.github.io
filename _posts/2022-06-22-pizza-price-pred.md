---
layout: post
title: "🍕Pizza Price Prediction🍕"
tags: blog, datascience, machinelearning
date: 2022-06-22 04:03 +0900
---

![hungry-homer](https://i.imgur.com/P8aqLFy.gif)

**Pizza** is probably one of the most consumed meals all over the world. Personally, it served a great portion of meals me and my roommate ate back in college. Every Saturday evening, we would get `$5.99 three-toppings medium pizza` from **Domino's** located right behind our apartment. It was the **cheapest** and **delicious** food we could get around the campus.

Although **Domino's** sells pizzas for a cheap price, pizzas can be **pricy** depending on their **sizes**, **toppings**, and the **restaurant** that makes them. Price can easily go above `$20 to $30`. To understand factors that affect the price of a pizza, a user on Kaggle gathered data on pizza orders from five different companies.

The purpose of this project is to use this dataset to obstain interesting insights about pizza orders and prices. The data collected includes sizes, topping variations, price, etc. The data will be analyzed and trained to build a prediction model for pizza prices.

[Link to the notebook](https://www.kaggle.com/code/kwangjongchoi/pizza-price-prediction)
[Link to the dataset](https://www.kaggle.com/datasets/knightbearr/pizza-price-prediction)


## Variables
```python
#load data
pizza_path = '../input/pizza-price-prediction/pizza_v2.csv'
df_raw = pd.read_csv(pizza_path)

df_raw.head()
```
![df_raw](https://i.imgur.com/6CuKHup.png)
```python
df_raw.info()
```
```
<class 'pandas.core.frame.DataFrame'>
RangeIndex: 129 entries, 0 to 128
Data columns (total 9 columns):
 #   Column           Non-Null Count  Dtype 
---  ------           --------------  ----- 
 0   company          129 non-null    object
 1   price_rupiah     129 non-null    object
 2   diameter         129 non-null    object
 3   topping          129 non-null    object
 4   variant          129 non-null    object
 5   size             129 non-null    object
 6   extra_sauce      129 non-null    object
 7   extra_cheese     129 non-null    object
 8   extra_mushrooms  129 non-null    object
dtypes: object(9)
memory usage: 9.2+ KB
```

It looks like `price_rupiah` and `diameter`, which are numeric data,  are stored in strings with the unit attached. <br>
Let's convert these two variables into floats.

```python
# covert price and diameter to float
df = df_raw.copy()

rupiah_to_int = lambda x: float(x[2:].replace(',',''))
inch_to_float = lambda x: float(x[:-5])

df['price_rupiah'] = list(map(rupiah_to_int, df.price_rupiah))
df['diameter'] = list(map(inch_to_float, df.diameter))
```

#### Variable Overview
* **Company**: Five unique companies(or restaurants) the pizzas were sold.
* **Price**: prices of piazzas in rupiahs.
* **Diameter**: diameters of piazzas in inches.
* **Topping**: 12 different toppings for pizzas.
* **Variants**: 20 different variants choice for pizzas.
* **Size**: pizza size choices: small, medium, large, xl, jumbo, reguler(or regular).
* **Extra Sauce**: yes or no.
* **Extra Cheese**: yes or no.
* **Extra Mushrooms**: yes or no.

## Exploring Data

### Price
![price-distribution](https://i.imgur.com/ho5GtzD.png)
```
mean: 87151.16279069768
mode: 72000.0
min: 23500.0
max: 248000.0
```
**The price of pizzas** ranges from `23500 to 24800 rupiahs`, but the `majority of the pizza was around 23500 to 150000 rupiahs`. The average price of pizza is `87151 rupiah`, and `72000-rupiahs pizzas are sold the most`.

### Company
![companies](https://i.imgur.com/A9rWrAD.png)
Five companies sold a fairly even amount of pizzas. **Company D** has the **least** orders, while **Company C** and **E** has the **most** orders. 
The **most expensive** company is **Company A**, and the **cheapest** companies are **Company C** and **E**. <br>

The **average price** at **Company A** costs `131440 rupiahs`, and **Company C** and **E** costs almost **half** the average price of **Company A**: `66800 rupiahs` and `73867 rupiahs`. <br>

Although **Company C** and **E** sold the most, **Company A** with the highest average price is the **third** in the number of pizzas sold. We can assume that `price isn't the only factor that attracts the customers`.

### Diameter
![diameter](https://i.imgur.com/id07Vxp.png)
**Diameters** range from `8 to 22 inches`, and **12-inch pizzas** are the most popular. **Diameters** shows positive correlations to the **price of the pizzas**. We can infer that generally bigger pizzas will cost more than smaller pizzas. However, take a look at the prices of 12-inch pizzas. They vary up to about 75000 rupiahs. We can conclude that **diameters generally show positive correlations to the prices of pizzas**, however **there are other factors that highly affect the prices of pizzas**.

### Size
![size](https://i.imgur.com/Q0cApT9.png)
Variable`Size` has six unique values: `small`, `medium`, `large`, `XL`, `reguler (regular)`, and `jumbo`. We can easily compare **small** , **medium**, **large**, and **XL**, but it is unclear if **regular** is smaller than **large** or **jumbo** bigger than **XL**. 

We can assume from the left chart that this is caused by the different size systems used by each company. **Company A** uses `regular-jumbo` system, while **Company B**, **C**, and **E** use `small-medium-large-XL` system. And for some reason, **Company D** uses all six sizes.

Luckily, we can simply ignore **size**. The universal measurement for the size of pizzas is **diameters**. Since we have **diameter** measurements in our dataset, **size** is **redundant** and can be **ignored** in training.

### Topping and Variant
![toppingnvariant](https://i.imgur.com/bZrJXRC.png)
Both `topping` and `variant` are broken down into a lot of unique options. Some of them overlap among five companies, but some do not. There are also separate values that describe the same thing: [`meat_lover`, `meat_eater`] or [`spicy tuna`, `spicy_tuna`].

When categorical variables are divided into many small subsets, obtaining useful insight can be hard. We can improve the qualities of data analysis by grouping similar categories. Let's cluster similar categories into bigger groups.
```python
# cluster toppings and variants
group_topping = {
    'beef': ['smoked_beef','beef'],
    'other_meat': ['meat','sausage','papperoni'],
    'vegetables': ['vegetables','onion']
}

group_variant = {
    'meat_lovers': ['meat_lovers','meat_eater'],
    'double': ['double_mix','double_decker','double_signature'],
    'BBQ': ['BBQ_meat_fiesta','BBQ_sausage'],
    'extra': ['super_supreme','extravaganza'],
    'veggie': ['thai_veggie','italian_veggie'],
    'american': ['american_classic','american_favorite'],
    'tuna': ['neptune_tuna','spicy tuna','spicy_tuna']
}

# toppings
print("-----toppings-----")
for key, value in group_topping.items():
    df['topping'] = df['topping'].apply(lambda x: key if x in value else x)
    
    print(key, ": ", value, sep="")

# variant
print("\n\n-----variant-----")
for key, value in group_variant.items():
    df['variant'] = df['variant'].apply(lambda x: key if x in value else x)
    
    print(key, ": ", value, sep="")
```
![toppingnvariant](https://i.imgur.com/0yN6RJn.png)
The charts above shows **price distributions** for each **topppings** and **variants**. **Price distributions of toppings** appears to be in the similar range. While there exists few outliers, `in most cases, toppings don't affect the price of the pizza`. On the flipside, **double** pizzas are in **the highest price ranges** among other variants, and **classic** are in **the lowest price range**. We can say `variants has more affect on the price of pizza then toppings`.

### Extra Sauce, Cheese, and Mushrooms
![extras](https://i.imgur.com/3UdUj57.png)
We see that `most customers prefer adding extras`. The number of pizza orders with extra cheese is **twice** as much as the orders without extra cheese.
`There is a little increase in the average prices with adding extras` although it is not a lot.

## Price Prediction
Let's build price prediction model using `XGBoost` and `RandomForest`.

### Train-Test Split
```python
from sklearn.model_selection import train_test_split

# train_test Split
y = df.price_rupiah
X = df.drop('price_rupiah', axis=1)

X_train, X_valid, y_train, y_valid = train_test_split(X, y)
X_train.info()
```

### Encoding
Train data consists of **one numerical variables** `diameter` and **four categorical variables**. Because there are no missing values, imputer is not nessesary.<br>
For encoding, we'll use `one-hot encoding` for `company`, `toppings`, and `variant`. We'll use`Ordinal-encoding` for `three "extras" variables`.

```python
from sklearn.preprocessing import OrdinalEncoder
from sklearn.preprocessing import OneHotEncoder

ord_cols=["extra_sauce", "extra_cheese", "extra_mushrooms"]
oh_cols=["company", "topping", "variant"]

X_train_encoded = X_train.copy()
X_valid_encoded = X_valid.copy()

ord_encoder = OrdinalEncoder()
X_train_encoded[ord_cols] = ord_encoder.fit_transform(X_train[ord_cols])
X_valid_encoded[ord_cols] = ord_encoder.transform(X_valid[ord_cols])

oh_encoder = OneHotEncoder(handle_unknown='ignore', sparse=False)
X_train_oh = pd.DataFrame(oh_encoder.fit_transform(X_train[oh_cols]))
X_valid_oh = pd.DataFrame(oh_encoder.transform(X_valid[oh_cols]))

X_train_oh.columns = oh_encoder.get_feature_names_out()
X_valid_oh.columns = oh_encoder.get_feature_names_out()

X_train_oh.index = X_train.index
X_valid_oh.index = X_valid.index

X_train_encoded.drop(oh_cols, axis=1, inplace=True)
X_valid_encoded.drop(oh_cols, axis=1, inplace=True)

X_train_encoded = pd.concat([X_train_encoded, X_train_oh], axis=1)
X_valid_encoded = pd.concat([X_valid_encoded, X_valid_oh], axis=1)
```

### XGBoost
```python
from xgboost import XGBRegressor

from sklearn.metrics import mean_absolute_error
from sklearn.metrics import mean_squared_error
from sklearn.metrics import r2_score

# define and train model
xgb = XGBRegressor(n_estimators=1000, learning_rate=0.05)
xgb.fit(X_train_encoded, y_train)
xgb_preds = xgb.predict(X_valid_encoded)

# calculate metrics
print("MAE:", mean_absolute_error(y_valid, xgb_preds))
print("RMSE", mean_squared_error(y_valid, xgb_preds, squared=False))
print("R2:", r2_score(y_valid, xgb_preds))
```
```
MAE: 6449.584398674242
RMSE 12209.138859647359
R2: 0.9373062066223009
```

### Random Forest
```python
from sklearn.ensemble import RandomForestRegressor

# define and train model
rf = RandomForestRegressor(n_estimators=1000, random_state=0)
rf.fit(X_train_encoded, y_train)
rf_preds = rf.predict(X_valid_encoded)

# calculate metrics
print("MAE:", mean_absolute_error(y_valid, rf_preds))
print("RMSE", mean_squared_error(y_valid, rf_preds, squared=False))
print("R2:", r2_score(y_valid, rf_preds))
```
```
MAE: 8733.621212121212
RMSE 15894.109896484142
R2: 0.8937504975604872
```

![truevspred](https://i.imgur.com/MpztJ5I.png)
**Xgboost** and **random forest** both shows similar performances yielding R2 score between `0.8 to 0.9`.

![featureimportance](https://i.imgur.com/81vb4Az.png)
We can see that, for **xgboost**, `variant_double` is the most importance features followed by `diameter`. For **random forest** `diameter` is the dominant feature with 70% of feature importance.


## Links
* [Link to the notebook](https://www.kaggle.com/code/kwangjongchoi/pizza-price-prediction)
* [Link to the dataset](https://www.kaggle.com/datasets/knightbearr/pizza-price-prediction)
