---
layout: post
title: "Data Science Review: Data Visualization"
tags: blog, datascience, datavisualization
date: 2022-03-31 16:35 +0900
hidden: true
---

I decided to review my data science knowledge. Before I get into the dirty part, Let's start with a very simple course: Data Visualization. I took an brief overview on Data Visualization using Kaggle.

<br/>

![data-vis](https://i.imgur.com/wNHfDZA.png)

# What is Seaborn?
My only previous data visualization experiences were plotting training model accuracy and losses using using **matplotlib.pyplot** and **imshow()** to view image data. However, when dealing with non-image data, various statistical graphs may comes in handy. 

**Seaborn** is a powerful data visualization library based on **matplotlib** and integrates closely with **pandas**. Being able to present data in more intuitive way is crutial in data analyzation process. **Seaborn** is a tool that helps to achieve such pruposes.


## Setup
```python
# Setup
import pandas as pd
pd.plotting.register_matplotlib_converters()
import matplotlib.pyplot as plt
%matplotlib inline
import seaborn as sns
print("Setup Complete")
```

## Read Data
```python
# read from csv
my_filepath = "input/example.csv"
my_data = pd.read_csv(my_filepath, index_col="Id")
#add parse_dates=True if dates are used as row label.
my_data = pd.read_csv(my_filepath, index_col="Dates", parse_dates=True)

# print the first 5 rows of the data
my_data.head()
# print the last 5 rows of the data
my_data.tail()
```

## Trends
```python
# line plot
# show trends over a periods of time
sns.lineplot(data=my_data)
```


## Relationship
```python
# barplot
# comparing quantities corresponding to different groups
sns.barplot(x=my_data.index, y=my_data['group1'])

# heatmap
# color-coded patterns in tables of numbers
sns.heatmap(data=my_data, annot=True)

# scatterplot
# relationshp between two continuous variables
sns.scatterplot(x=my_data['var1'], y=my_data['var2'])

# scatterplot w/ regression line
sns.regplot(x=my_data['var1'], y=my_data['var2'])

# scatterplot w/ color
# add third categorial variable to the scatterplot with color
sns.scatterplot(x=my_data['var1'], y=my_data['var2'], hue=my_data['category1'])

# scatterplot w/ multiple regression line
# draw multiple regression line on scatter plot with color-coded variables
sns.lmplot(x="var1", y="var2", hue="category1", data=my_data)

# categorical scatter plot
# show the relationship between a continuous variable and categorical variable
sns.swarmplot(x=my_data['category1'], y=my_data['var1'])
```

## Distribution
```python
# histogram
# show distribution of a single numerical value
sns.distplot(a=my_data['var1'], kde=False)

# kde
# show an estimated, smooth distribution of a single numerical variable
sns.kdeplot(data=my_data['var1'], shade=True)

# 2d kde
# kde plot with two numerical variables
sns.jointplot(x=my_data['var1'], y=my_data['var2'], kind="kde")
```

<br/>


# Covid-19 Dataset
Dataset published by "Our World in Data" developed in collaboration with The University of Oxford.
The dataset involves vaccinations, confirmed cases & deaths, and other variables of interests collected from 238 countries.

<h4 style="margin-bottom: 0;">Links:</h4>

[Kaggle Dataset](https://www.kaggle.com/datasets/caesarmario/our-world-in-data-covid19-dataset)<br/>
[Our World In Data Github](https://github.com/owid/covid-19-data/tree/master/public/data)<br/>
[Our World In Data Website](https://ourworldindata.org/covid-vaccinations)


## Trend in daily confirmed COVID-19 cases in Korea, 2022
First, let's look at the recent trends in Korea.
```python
#extract KOR data
covid_KOR_data = covid_data[covid_data['iso_code'] == 'KOR']

# line plot
sns.set_theme() #run only once

plt.figure(figsize=(14,7))

ax = sns.lineplot(data=covid_KOR_data['new_cases']['2022-01-01':])

ax.set(xlabel=" ", ylabel="Number of new cases")
ax.set_title("Daily confirmed COVID-19 cases in Korea, 2022", fontsize=15, pad=15)
plt.show()
```

![covid-korea](https://i.imgur.com/lNMI73z.png)

The number of new confirmed cases rapidly increases and climaxes passing Mar 15th and falls afterward.


## Trend in cumulative COVID-19 cases and deaths per million by continenent
Let's compare by continent. First, I grouped the dataset by continent and calculated the mean.
```python
# calculate mean by continent
index = ['continent',
         'total_cases_per_million', 
         'new_cases_per_million',
         'total_deaths_per_million', 
         'people_vaccinated_per_hundred',
         'people_fully_vaccinated_per_hundred']

covid_data_continent = covid_data[index].reset_index().groupby(['date', 'continent'], as_index=False).mean().set_index('date')
```
Then, I plot total cases and total deaths by continent standardized with million population.
```python
# line plot
fig, (ax1, ax2) = plt.subplots(1, 2, figsize=(28, 7))
plt.subplots_adjust(hspace=0.2)

ax1.set(xlabel=" ", ylabel="Total cases per million")
ax1.set_title("Total COVID-19 cases per million by continent", fontsize=15, pad=15)
sns.lineplot(x='date', y='total_cases_per_million',hue='continent', data=covid_data_continent.reset_index(), ax=ax1)

ax2.set(xlabel=" ", ylabel="Total deaths per million")
ax2.set_title("Total deaths per million by continent", fontsize=15, pad=15)
sns.lineplot(x='date', y='total_deaths_per_million',hue='continent', data=covid_data_continent.reset_index(), ax=ax2)

fig.show()
```

![covid-continent](https://i.imgur.com/mZPFoDf.png)

Using the standardized data, the highest cumulative cases were recorded in Europe, and the lowest cumulative cases were in Africa. All five continents excluding Africa escalated rapidly at the beginning of 2022.

The continent with the highest cumulative deaths in South America followed by Europe, while Africa has the lowest cumulative deaths. While the number of cases rises rapidly entering 2022, the number of deaths did not show any changes in trend.


## Vaccination rate and the correlation between vaccination rate and GDP per capita
I also compared vaccination rates and its correlation with GDP per capita.
```python
#bar plot
fig, (ax1, ax2) = plt.subplots(1, 2, figsize=(28,7))
plt.subplots_adjust(hspace=0.2)

ax1 = sns.barplot(x=covid_data_continent['continent']['2022-03-27'], y=covid_data_continent['people_vaccinated_per_hundred']['2022-03-27'], ax=ax1)
ax1.set(xlabel=" ", ylabel="People vaccinated per hundred")
ax1.set_title("Vaccination rate by continent, Mar 27th, 2022", fontsize=15, pad=15)

# scatterplot
sns.scatterplot(x=covid_data['gdp_per_capita']['2022-03-27'], y=covid_data['people_vaccinated_per_hundred']['2022-03-27'], hue=covid_data['continent']['2022-03-27'])
ax = sns.regplot(x=covid_data['gdp_per_capita']['2022-03-27'], y=covid_data['people_vaccinated_per_hundred']['2022-03-27'],scatter=False)

ax2.set(xlabel="GDP per capita", ylabel="People Vacinated per Hundred")
ax2.set_title("Correlation between vaccination rate and GDP per capita, Mar 27th, 2022", fontsize=15, pad=15)

plt.show()
```

![vaccination-rate](https://i.imgur.com/7Xo7QuA.png)

Oceania is showing the highest vaccination rate, while Africa has the lowest vaccination rate. Four other continents are showing similar rates around 60-70%.

The scatter plot between vaccination rate and GDP per capita shows a positive slope. This means GDP per capita plays a role in the vaccination rate. However, many countries with low GDP per capita show high vaccination rates.

## Links
* [Link to my notebook](https://www.kaggle.com/code/kwangjongchoi/data-visualization-practice-covid-19)
* [Data Visualization Course on Kaggle](https://www.kaggle.com/learn/data-visualization)
