---
layout: post
title: "🚀Spaceship Titanic: Feature Engineering + NN Model"
tags: blog, datascience, deeplearning
date: 2022-07-15 00:50 +0900
---

Predict which passengers are transported to an alternate dimension

![spaceship-t](https://i.imgur.com/voGgul0.png)

## Introduction

> Welcome to the year 2912, where your data science skills are needed to solve a cosmic mystery. We've received a transmission from four lightyears away and things aren't looking good.
>
> The Spaceship Titanic was an interstellar passenger liner launched a month ago. With almost 13,000 passengers on board, the vessel set out on its maiden voyage transporting emigrants from our solar system to three newly habitable exoplanets orbiting nearby stars.
>
> While rounding Alpha Centauri en route to its first destination—the torrid 55 Cancri E—the unwary Spaceship Titanic collided with a spacetime anomaly hidden within a dust cloud. Sadly, it met a similar fate as its namesake from 1000 years before. Though the ship stayed intact, almost half of the passengers were transported to an alternate dimension!
>
>To help rescue crews and retrieve the lost passengers, you are challenged to predict which passengers were transported by the anomaly using records recovered from the spaceship’s damaged computer system.
>
>Help save them and change history!

## Feature Engineering

```python
#load data
titanic_train_path = "../input/spaceship-titanic/train.csv"
titanic_train_raw = pd.read_csv(titanic_train_path)

print(titanic_train_raw.info())
titanic_train_raw.head()
```

```
<class 'pandas.core.frame.DataFrame'>
RangeIndex: 8693 entries, 0 to 8692
Data columns (total 14 columns):
 #   Column        Non-Null Count  Dtype  
---  ------        --------------  -----  
 0   PassengerId   8693 non-null   object 
 1   HomePlanet    8492 non-null   object 
 2   CryoSleep     8476 non-null   object 
 3   Cabin         8494 non-null   object 
 4   Destination   8511 non-null   object 
 5   Age           8514 non-null   float64
 6   VIP           8490 non-null   object 
 7   RoomService   8512 non-null   float64
 8   FoodCourt     8510 non-null   float64
 9   ShoppingMall  8485 non-null   float64
 10  Spa           8510 non-null   float64
 11  VRDeck        8505 non-null   float64
 12  Name          8493 non-null   object 
 13  Transported   8693 non-null   bool   
dtypes: bool(1), float64(6), object(7)
memory usage: 891.5+ KB
```
![head](https://i.imgur.com/nxvukrl.png)

```python
titanic_train_raw.isnull().sum()
```
```
PassengerId       0
HomePlanet      201
CryoSleep       217
Cabin           199
Destination     182
Age             179
VIP             203
RoomService     181
FoodCourt       183
ShoppingMall    208
Spa             183
VRDeck          188
Name            200
Transported       0
dtype: int64
```

### About Each Features

* **PassengerId**: A unique Id for each passenger. Each Id takes the form gggg_pp where gggg indicates a group the passenger is travelling with and pp is their number within the group. People in a group are often family members, but not always.
* **HomePlanet**: The planet the passenger departed from, typically their planet of permanent residence.
* **CryoSleep**: Indicates whether the passenger elected to be put into suspended animation for the duration of the voyage. Passengers in cryosleep are confined to their cabins.
* **Cabin**: The cabin number where the passenger is staying. Takes the form deck/num/side, where side can be either P for Port or S for Starboard.
* **Destination**: The planet the passenger will be debarking to.
* **Age**: The age of the passenger.
* **VIP**: Whether the passenger has paid for special VIP service during the voyage.
* **RoomService**, **FoodCourt**, **ShoppingMall**, **Spa**, **VRDeck**: Amount the passenger has billed at each of the Spaceship Titanic's many luxury amenities.
* **Name**: The first and last names of the passenger.
* **Transported**: Whether the passenger was transported to another dimension. This is the target, the column you are trying to predict.


### Extract useful informations from features
```python
def extract_info(df):
    #extract groupID from PassengerID
    df['GroupID'] = df['PassengerId'].str.split('_', expand=True)[0]

    #split cabin into deck, num, and side
    cabin_split = df['Cabin'].str.split('/', expand=True)
    df['CabinDeck'] = cabin_split[0]
    df['CabinNum'] = cabin_split[1]
    df['CabinSide'] = cabin_split[2]
    df.drop('Cabin', inplace=True, axis=1)

    #split first and family name
    name_split = df['Name'].str.split(' ', expand=True)
    df['FamilyName'] = name_split[1]
    df.drop('Name', inplace=True, axis=1)
    
    #calculate total amenities fee
    amenities = ['RoomService', 'FoodCourt', 'ShoppingMall', 'Spa', 'VRDeck']
    df['TotalFee'] = df[amenities].sum(axis=1)
    
    #fix numeric data's dtype
    numeric = ['CryoSleep','Age','VIP','RoomService','FoodCourt','ShoppingMall','Spa','VRDeck','GroupID','CabinNum','TotalFee']
    for n in numeric:
        df[n] = pd.to_numeric(df[n])
    
    return df
```

### Filling missing values with educated guess

#### HomePlanet vs Group and Family
```python
#search groups with different home planet and destination
list_group = ['FamilyName', 'GroupID']
list_target = ['HomePlanet', 'Destination']

for group in list_group:
    for target in list_target:
        num_target_in_group = titanic_train.groupby([group])[target].nunique().reset_index()
        print("# of %s with different %s: %d" % (group, target, num_target_in_group[num_target_in_group[target] > 1].shape[0]))
print("\ntotal # of families: %s  total # of groups: %s"%(titanic_train.nunique()['FamilyName'], titanic_train.nunique()['GroupID']))
```
```
# of FamilyName with different HomePlanet: 0
# of FamilyName with different Destination: 1215
# of GroupID with different HomePlanet: 0
# of GroupID with different Destination: 717

total # of families: 2217  total # of groups: 6217
```

```python
#passengers in same family and passengers in same group are from same home planet, but does not always goes to same destination
def homeplanet_vs_group_family_fill(df):
    list_group = ['GroupID', 'FamilyName']
    for group in list_group:
        home_planet_in_group = df.dropna(subset=[group, 'HomePlanet']).drop_duplicates([group])[[group,'HomePlanet']]
        home_planet_dict = dict(zip(home_planet_in_group[group], home_planet_in_group['HomePlanet']))
        df['HomePlanet'] = df['HomePlanet'].fillna(df[group].map(home_planet_dict))
    
    return df
```

#### CryoSleep vs Amenities
```python
#passengers in cryo sleep has no amenities expenses
def cryo_vs_amenities_fill(df):
    df['RoomService'] = np.where(df['CryoSleep'] == True, 0, df['RoomService'])
    df['FoodCourt'] = np.where(df['CryoSleep'] == True, 0, df['FoodCourt'])
    df['ShoppingMall'] = np.where(df['CryoSleep'] == True, 0, df['ShoppingMall'])
    df['Spa'] = np.where(df['CryoSleep'] == True, 0, df['Spa'])
    df['VRDeck'] = np.where(df['CryoSleep'] == True, 0, df['VRDeck'])

    df['CryoSleep'] = np.where(df['TotalFee'] > 0, False, df['CryoSleep'])
    
    return df
```

#### Age Limit
```python
#find age limit for vip and amenities
under_21 = titanic_train[titanic_train['Age']<21]

fig, ax = plt.subplots(1, 2, figsize=(18,4))

ax[0].set_title("Age vs VIP")
sns.barplot(x=under_21.Age, y=under_21.VIP, ax=ax[0])

ax[1].set_title("Age vs Total Amenities Fee")
sns.barplot(x=under_21.Age, y=under_21.TotalFee, ax=ax[1])

fig.show()
```

![age-limit](https://i.imgur.com/yOPpk8y.png)

```python
def age_limit_fill(df, vip_limit=18, amenities_limit=13):
    df['VIP'] = np.where(df['Age'] < vip_limit, False, df['VIP'])
    
    df['RoomService'] = np.where(df['Age'] < amenities_limit, 0, df['RoomService'])
    df['FoodCourt'] = np.where(df['Age'] < amenities_limit, 0, df['FoodCourt'])
    df['ShoppingMall'] = np.where(df['Age'] < amenities_limit, 0, df['ShoppingMall'])
    df['Spa'] = np.where(df['Age'] < amenities_limit, 0, df['Spa'])
    df['VRDeck'] = np.where(df['Age'] < amenities_limit, 0, df['VRDeck'])

    df['TotalFee'] = np.where(df['Age'] < amenities_limit, 0, df['TotalFee'])
    
    return df
```

### Modes and Means

```python
def mode_by_group_n_family_fill(df, columns=['CabinDeck','CabinNum','CabinSide']):
    for col in columns:
        print(col)
        mode_by_group = df.dropna(subset=[col]).groupby(['GroupID', 'FamilyName'])[col].agg(lambda x: pd.Series.mode(x)[0]).reset_index()
        mode_dict = dict(zip(mode_by_group.set_index(['GroupID', 'FamilyName']).index, mode_by_group[col]))
        df[col] = df[col].fillna(df.set_index(['GroupID', 'FamilyName']).index.map(mode_dict).to_series().reset_index(drop=True))

    return df
```
Families in the same traveling group are likely to be traveling in the same cabin.


```python
def mode_by_group_fill(df, columns=['FamilyName','CabinDeck','CabinNum','CabinSide']):
    for col in columns:
        print(col)
        mode_by_group = df.dropna(subset=[col]).groupby('GroupID')[col].agg(lambda x: pd.Series.mode(x)[0]).reset_index()
        mode_dict = dict(zip(mode_by_group['GroupID'], mode_by_group[col]))
        df[col] = df[col].fillna(df['GroupID'].map(mode_dict))
    
    return df
```
Passengers in same traveling group are likely to travel in the same cabin.
Also fill missing family names within a traveling group.


```python
def mode_fill(df, columns=['HomePlanet','CryoSleep','Destination','RoomService','FoodCourt','ShoppingMall','Spa','VRDeck','VIP','FamilyName','CabinDeck','CabinNum','CabinSide']):
    for col in columns:
        print(col)
        df[col] = df[col].fillna(value = df[col].mode()[0])
    
    return df
```
Fill the rest with the mode of entire dataset.


```python
def mean_fill(df, columns=['Age']):
    for col in columns:
        print(col)
        df[col] = df[col].fillna(value = df[col].mean())
    
    return df
```
Fill missing ages with mean age.


## More useful features
```python
def count_group_family(df):

    #count # of family members (passengers with same family name) in same traveling group
    num_family_members = df.groupby('FamilyName')['PassengerId'].count().reset_index()
    num_family_members_dict = dict(zip(num_family_members['FamilyName'], num_family_members['PassengerId']))
    df['NumFamilyMembers'] = df['FamilyName'].map(num_family_members_dict)

    #count # of group memebers
    num_group_members = df.groupby('GroupID')['PassengerId'].count().reset_index()
    num_group_members_dict = dict(zip(num_group_members['GroupID'], num_group_members['PassengerId']))
    df['NumGroupMembers'] = df['GroupID'].map(num_group_members_dict)

    return df
```
```python
def age_group(df):
    df['Age_group'] = df['Age']//20
    
    return df
```

## Preprocessing

```python
from sklearn.preprocessing import LabelEncoder

#onehot_encoding
def one_hot(df, columns):
    for col in columns:
        dummies = pd.get_dummies(df[col], prefix = col)
        df = pd.concat([df, dummies], axis = 1)
    df = df.drop(columns = columns)
    return df

# compile all into a function
def preprocessing(train, test):
    #train data
    train = extract_info(train)
    train = homeplanet_vs_group_family_fill(train)
    train = cryo_vs_amenities_fill(train)
    train = age_limit_fill(train)
    train = mode_by_group_n_family_fill(train)
    train = mode_by_group_fill(train)
    train = mode_fill(train)
    train = mean_fill(train)
    trian = count_group_family(train)
    train = age_group(train)
    
    #test data
    test = extract_info(test)
    test = homeplanet_vs_group_family_fill(test)
    test = cryo_vs_amenities_fill(test)
    test = age_limit_fill(test)
    test = mode_by_group_n_family_fill(test)
    test = mode_by_group_fill(test)
    test = mode_fill(test)
    test = mean_fill(test)
    test = count_group_family(test)
    test = age_group(test)
    
    remove_col = [
        'PassengerId',
        
    ]
    
    
    one_hot_col = [
        'HomePlanet',
        'Destination',
        'CabinDeck',
        'CabinSide'
    ]
    
    label_encode_col = [
        'FamilyName'
    ]
    
    train = train.drop(columns=remove_col)
    test = test.drop(columns=remove_col)
    
    train = one_hot(train, one_hot_col)
    test = one_hot(test, one_hot_col)
    
    concat_data = pd.concat([train[label_encode_col], test[label_encode_col]])
    label_encoder = LabelEncoder()
    label_encoder.fit(concat_data[label_encode_col])
    
    
    for col in label_encode_col:
        train[col] = label_encoder.transform(train[col])
        test[col] = label_encoder.transform(test[col])
    
    return train, test
```

```python
titanic_train_path = "../input/spaceship-titanic/train.csv"
titanic_test_path = "../input/spaceship-titanic/test.csv"
titanic_train_raw = pd.read_csv(titanic_train_path)
titanic_test_raw = pd.read_csv(titanic_test_path)

titanic_train_y = titanic_train_raw.Transported
titanic_train_X = titanic_train_raw.drop(columns="Transported")
titanic_train_X, titanic_test_X = preprocessing(titanic_train_X, titanic_test_raw)
titanic_train_X.info()
```
```
<class 'pandas.core.frame.DataFrame'>
RangeIndex: 8693 entries, 0 to 8692
Data columns (total 31 columns):
 #   Column                     Non-Null Count  Dtype  
---  ------                     --------------  -----  
 0   CryoSleep                  8693 non-null   float64
 1   Age                        8693 non-null   float64
 2   VIP                        8693 non-null   float64
 3   RoomService                8693 non-null   float64
 4   FoodCourt                  8693 non-null   float64
 5   ShoppingMall               8693 non-null   float64
 6   Spa                        8693 non-null   float64
 7   VRDeck                     8693 non-null   float64
 8   GroupID                    8693 non-null   int64  
 9   CabinNum                   8693 non-null   float64
 10  FamilyName                 8693 non-null   int64  
 11  TotalFee                   8693 non-null   float64
 12  NumFamilyMembers           8693 non-null   int64  
 13  NumGroupMembers            8693 non-null   int64  
 14  Age_group                  8693 non-null   float64
 15  HomePlanet_Earth           8693 non-null   uint8  
 16  HomePlanet_Europa          8693 non-null   uint8  
 17  HomePlanet_Mars            8693 non-null   uint8  
 18  Destination_55 Cancri e    8693 non-null   uint8  
 19  Destination_PSO J318.5-22  8693 non-null   uint8  
 20  Destination_TRAPPIST-1e    8693 non-null   uint8  
 21  CabinDeck_A                8693 non-null   uint8  
 22  CabinDeck_B                8693 non-null   uint8  
 23  CabinDeck_C                8693 non-null   uint8  
 24  CabinDeck_D                8693 non-null   uint8  
 25  CabinDeck_E                8693 non-null   uint8  
 26  CabinDeck_F                8693 non-null   uint8  
 27  CabinDeck_G                8693 non-null   uint8  
 28  CabinDeck_T                8693 non-null   uint8  
 29  CabinSide_P                8693 non-null   uint8  
 30  CabinSide_S                8693 non-null   uint8  
dtypes: float64(11), int64(4), uint8(16)
memory usage: 1.1 MB
```

## Build Model

```python
from sklearn.model_selection import train_test_split
from tensorflow import keras
from tensorflow.keras import layers 
```

```
X_train, X_valid, y_train, y_valid = train_test_split(titanic_train_X.copy(), titanic_train_y.copy())
```

```
model = keras.Sequential([
    layers.BatchNormalization(input_shape=[31]),
    layers.Dropout(rate=0.2),
    layers.Dense(units=1024, activation='swish'),
    layers.BatchNormalization(),
    layers.Dropout(rate=0.2),
    layers.Dense(units=256, activation='swish'),
    layers.BatchNormalization(),
    layers.Dropout(rate=0.2),
    layers.Dense(units=128, activation='swish'),
    layers.BatchNormalization(),
    layers.Dense(units=1,activation='sigmoid'),
])

model.compile(
    optimizer='adam',
    loss='binary_crossentropy',
    metrics=['binary_accuracy'],
)
```

## Training
```
early_stopping = keras.callbacks.EarlyStopping(
    patience=10,
    min_delta=0.01,
    restore_best_weights=True,
)

history = model.fit(
    X_train, y_train,
    validation_data=(X_valid, y_valid),
    batch_size=256,
    epochs=200,
    callbacks=[early_stopping],
)

history_df = pd.DataFrame(history.history)
history_df.loc[:, ['loss', 'val_loss']].plot()
history_df.loc[:, ['binary_accuracy','val_binary_accuracy']].plot()
```

![training_history](https://i.imgur.com/BmHMvOf.png)

```python
#lets fit train data too to improve accuracy
model.fit(
    titanic_train_X, titanic_train_y,
    batch_size=512,
    epochs=35,
)
```

## Make Prediction
```python
test_y = model.predict(titanic_test_X)
```

```python
submission = pd.DataFrame(titanic_test_raw.PassengerId)
submission['Transported'] = np.where(test_y > 0.5, True, False)
submission.to_csv('submission_04.csv', index = False)
```

## My Score

![my_score](https://i.imgur.com/FGiSkO9.png)


Links
* [Link to the competition](https://www.kaggle.com/competitions/spaceship-titanic)
* [Link to my notebook](https://www.kaggle.com/code/kwangjongchoi/spaceship-titanic-feature-eng-nn-model/notebook)

