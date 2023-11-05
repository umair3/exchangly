def sort_csv_columns(csv_data: str) -> str:
    # split into rows
    rows = csv_data.split('\n')
    # get the first row
    header_row = rows[0]
    # get column names
    column_names = header_row.split(',')
    # get data rows
    data_rows = [row.split(',') for row in rows[1:]]
    # zip rows and columns in tuples
    tuples = [(column_name, values) for column_name, values in zip(column_names, zip(*data_rows))]
    # sorting columns
    tuples.sort(key=lambda x: x[0].lower())
    # Unzip the sorted tuples
    sorted_column_names, sorted_data = zip(*tuples)
    # Rebuild the header row
    header_row = ','.join(sorted_column_names)
    # Rebuild the data rows
    data_rows = [','.join(values) for values in zip(*sorted_data)]
    # Rebuild the CSV string
    sorted_csv_string = '\n'.join([header_row] + data_rows)
    return sorted_csv_string


csv_string = 'col3,col2,col1\nval3,val2,val1\nval33,val22,val11\nval333,val222,val111'
print(sort_csv_columns(csv_string))
