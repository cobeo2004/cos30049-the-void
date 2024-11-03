import pandas as pd
import json

class ExtractDataFromCSV:
    def __init__(self, csv_file='German Air Fare.csv'):
        self.data = pd.read_csv(csv_file)
        self.data['departure_date'] = pd.to_datetime(self.data['departure_date'])

    def price_trend_line_chart(self, output_file):
        self.data['Month'] = self.data['departure_date'].dt.strftime('%b')
        trend_data = self.data.groupby('Month')['Price'].mean().reset_index()
        trend_data = trend_data.rename(columns={'Month': 'month', 'Price': 'price'})
        month_order = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
        trend_data['month'] = pd.Categorical(trend_data['month'], categories=month_order, ordered=True)
        trend_data = trend_data.sort_values('month')
        trend_data.to_json(output_file, orient='records')

    def price_distribution_bar_chart(self, output_file):
        bins = [0, 100, 200, 300, 400, 500, 600, 700, 2000]  
        labels = [f"{bins[i]}-{bins[i+1]}" for i in range(len(bins)-1)]
        self.data['PriceRange'] = pd.cut(self.data['price (€)'], bins=bins, labels=labels, right=False)
        distribution_data = self.data['PriceRange'].value_counts().reset_index()
        distribution_data.columns = ['range', 'count']
        distribution_data.to_json(output_file, orient='records')

    def seasonal_analysis(self, output_file):
        self.data['Month'] = self.data['departure_date'].dt.strftime('%b')
        month_order = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
                       'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
        self.data['Month'] = pd.Categorical(self.data['Month'], categories=month_order, ordered=True)
        seasonal_data = self.data.groupby('Month').agg(
            demand=('Price', 'count'),
            price=('Price', 'mean')
        ).reset_index()
        seasonal_data = seasonal_data.rename(columns={'Month': 'month'})
        seasonal_data.to_json(output_file, orient='records')