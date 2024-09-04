import pandas as pd
import numpy as np
from scipy import stats
import matplotlib.pyplot as plt
import seaborn as sns

# Load the dataset
df = pd.read_csv('traffic.csv')

# Total Pageviews
total_pageviews = df['pageviews'].sum()
print(f"Total Pageviews: {total_pageviews}")

# Daily Average Pageviews
average_daily_pageviews = df.groupby('date')['pageviews'].sum().mean()
print(f"Average Daily Pageviews: {average_daily_pageviews}")

# Analysis of Other Events
event_distribution = df['event_type'].value_counts()
print(f"Event Distribution:\n{event_distribution}")

# Geographical Distribution
geographical_distribution = df.groupby('country')['pageviews'].sum()
print(f"Geographical Distribution:\n{geographical_distribution}")

# Click-Through Rate (CTR) Analysis
df['ctr'] = df['clicks'] / df['pageviews']
overall_ctr = df['ctr'].mean()
print(f"Overall CTR: {overall_ctr}")

# CTR by Link
ctr_by_link = df.groupby('link')['ctr'].mean()
print(f"CTR by Link:\n{ctr_by_link}")

# Correlation Analysis
clicks_previews_corr = df[['clicks', 'previews']].corr(method='pearson')
print(f"Correlation between Clicks and Previews:\n{clicks_previews_corr}")

# Statistical significance test
correlation_test = stats.pearsonr(df['clicks'], df['previews'])
print(f"Correlation Test Result: {correlation_test}")

# Visualization (Optional)
geographical_distribution.plot(kind='bar')
plt.title("Geographical Distribution of Pageviews")
plt.show()

ctr_by_link.plot(kind='bar')
plt.title("CTR by Link")
plt.show()