def sort_csv_columns_by_values(csv_string, column_name):
    # Split the CSV string into rows
    rows = csv_string.split('\n')
    # Get the header row
    header_row = rows[0]
    # Split the header row into column names
    column_names = header_row.split(',')
    # Split the data rows into lists of values
    data_rows = [row.split(',') for row in rows[1:]]
    # Zip the column names with the lists of values
    tuples = [(column_name, values) for column_name, values in zip(column_names, zip(*data_rows))]

    # Sort the tuples by the values in the desired column
    def get_value(tuple):
        column_name, values = tuple
        if column_name == column_name:
            return values

    tuples.sort(key=get_value)
    # Unzip the sorted tuples
    sorted_column_names, sorted_data = zip(*tuples)
    # Rebuild the header row
    header_row = ','.join(sorted_column_names)
    # Rebuild the data rows
    data_rows = [','.join(values) for values in zip(*sorted_data)]
    # Rebuild the CSV string
    sorted_csv_string = '\n'.join([header_row] + data_rows)
    return sorted_csv_string


csv_string = 'col1,col2,col3\nval1,val2,val3\nval2,val1,val3\n'
print(sort_csv_columns_by_values(csv_string))
