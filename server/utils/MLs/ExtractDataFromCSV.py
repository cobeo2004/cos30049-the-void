import pandas as pd
import os
class ExtractDataFromCSV:
    def __init__(self, csv_file='german_air_fares.csv'):
        self.data = pd.read_csv(os.path.join(os.path.dirname(__file__), csv_file))
        # Create month column from month, day, year columns
        self.data['month'] = pd.to_datetime(self.data[['year', 'month']].assign(day=1))

    def price_trend_line_chart(self):
        trend_data = self.data.groupby('month')['price'].mean().reset_index()
        # Convert month to month name
        trend_data['month'] = trend_data['month'].dt.strftime('%b')
        month_order = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
        trend_data['month'] = pd.Categorical(trend_data['month'], categories=month_order, ordered=True)
        trend_data = trend_data.sort_values('month')
        return trend_data.to_json(orient='records')

    def price_distribution_bar_chart(self):
        bins = [0, 100, 200, 300, 400, 500, 600, 700, 2000]
        labels = [f"{bins[i]}-{bins[i+1]}" for i in range(len(bins)-1)]
        self.data['PriceRange'] = pd.cut(self.data['price'], bins=bins, labels=labels, right=False)
        distribution_data = self.data['PriceRange'].value_counts().reset_index()
        distribution_data.columns = ['range', 'count']
        return distribution_data.to_json(orient='records')

    def seasonal_analysis(self):
        # Convert month to month name
        self.data['month_name'] = self.data['month'].dt.strftime('%b')
        month_order = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
                       'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
        self.data['month_name'] = pd.Categorical(self.data['month_name'], categories=month_order, ordered=True)
        seasonal_data = self.data.groupby('month_name').agg(
            demand=('price', 'count'),
            price=('price', 'mean')
        ).reset_index()
        seasonal_data = seasonal_data.rename(columns={'month_name': 'month'})
        return seasonal_data.to_json(orient='records')
