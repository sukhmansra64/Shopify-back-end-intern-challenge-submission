# shopify backend challenge
 My submission to the shopify backend intern challenge for 2022, the extra feature I added was the ability to create shipments and adding items, and hopefully fully functioning error testing.  
 to said shipment the challenge is found here at: https://docs.google.com/document/d/1z9LZ_kZBUbg-O2MhZVVSqTmvDko5IJWHtuFmIu_Xg1A/edit, *PLEASE NOTE 
 THAT WHERE EVER (BRACKETS) ARE USED, YOU ARE SUPPOSED TO ADD WHAT THE BRACKETS DESCRIBE AND NOT THE BRACKETS THEMSELVES, ESPECIALLY WITH THE URL REQUETS*

### How to use
download the repository and run "npm start" in the terminal of the directory of the program, the server should be running at http://localhost:8000 
the best way to utilze this program is by using Postman, or a similar application which can make http requests along with sending raw JSON data to an 
API (CONTENT TYPE FOR REQUESTS WHICH SEND JSON DATA IS application/json)

## Simple tasks 

# test to see if server is working 
Run a get request at http://localhost:8000

## Inventory tasks 

# Get all inventory items
Make a GET request at http://localhost:8000/api/inventory, use this data for when IDs are required for other tasks

# Create an inventory item
to create an item make a POST request at http://localhost:8000/api/inventory and send json data in this format:
{
    "name": "(Any name)",
    "Description": "(Any description)"
}

 # Update an Inventory Item
 Make a POST request at http://localhost:8000/api/inventory/(ITEM ID) where (ITEM ID) is used as parameters for the route
 
  # Delete an Inventory Item
 Make a DELETE request at http://localhost:8000/api/inventory/(ITEM ID) where (ITEM ID) is used as parameters for the route
 
 ## Shipment Tasks
 
 # Get all shipments
Make a GET request at http://localhost:8000/api/shipment, use this data for when IDs are required for other tasks
 
 # Create a shipment
to create an shipment make a POST request at http://localhost:8000/api/shipment and send json data in this format:
 {
    "name": "(Shipment name)",
    "destination": "(Where the shipment will be going)",
    "description": "(Description of the shipment)"
}

 # Delete a shipment
 Make a DELETE request at http://localhost:8000/api/shipment/(shipment ID) where (shipment ID) is used as parameters for the route
 
 # Add an item to the shipment
 Make a POST request at http://localhost:8000/api/shipment/(Shipment ID)/(Item ID) where (shipment ID) & (Item ID) are used as parameters for the route
 
