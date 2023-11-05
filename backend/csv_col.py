def sort_csv_columns(csv_string):
    # Split the CSV string into rows
    rows = csv_string.split('\n')

    # Get the header row
    header_row = rows[0]

    # Split the header row into column names
    column_names = header_row.split(',')

    # Sort the column names
    column_names.sort(key=lambda x: x.lower())

    # Rebuild the header row
    header_row = ','.join(column_names)

    # Rebuild the rows list with the sorted header row
    rows = [header_row] + rows[1:]

    # Rebuild the CSV string
    sorted_csv_string = '\n'.join(rows)

    return sorted_csv_string


csv_string = 'col3,col2,col1\nval3,val2,val1\n'
print(sort_csv_columns(csv_string))
