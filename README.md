# Project 1: Foodastic Meal Search Engine, 7 Jan 20
#### By Rabia, Ashley, Ikra, Jenner

## Link to Application
Direct link to application: https://stithac.github.io/project1_group7/

## Group Name:
RAIJ _(RAGE)_: Because 4 women, 1 project... Yeah, we get it

## Description
An app to help decide what’s for lunch/dinner!!!

- You want to cook? We got recipes!
- You want to eat out? We got restaurants!
- You don’t know? Tell us what you’re in the mood for and we’ll give you both!

Foodastic is an application that allows users to search for recipes and restaurants. It features dynamically updated HTML and CSS powered by jQuery.  It also includes 2 APIs to pull in information.  The [Spoonacular Food API](https://spoonacular.com/food-api) is used to retrieve recipes, and the [Yelp Fusion API](https://www.yelp.com/fusion) is used to retrieve restaurants.  The APIs are called via AJAX based on filter criteria input by the user.

## Features
The application includes 6 main html pages: home, dinein, dineout, dunno, about and favorites.  Each page utilizes different technologies and API calls.

### Home page
#### Landing page (index.html)
![Screenshot](/assets/img/screenshot-home.PNG?raw=true)

### Dinein Page
![Screenshot](/assets/img/screenshot-dinein.PNG?raw=true)

#### Page functionality:
The dinein page is accessed via the "Dine in" link in the top navigation or from the home page.  It includes a left navbar with the filters:

- By Main ingredient
- Find recipe by name
- By Cuisine
- By Category

Users are able to use these filters and click the Search button to display the results.  Alternatively, the page also includes 6 speedy eat filter images.  Once clicked, the following filters are applied and sent to the Spoonacular API:

- Spicy: "spicy"
- Savory: "savory"
- One Pot: "casseroles"
- Special Occasion: "french"
- Healthy: "salads"
- Surprise: "main courses"

Once the user selects their filters via the left hand, or speedy eat filter images, the Spoonacular API is called and the filter images are hidden from the page.  While the page loads, a loading image will display until the results are then displayed on the screen.

![Screenshot](/assets/img/screenshot-dinein-results.PNG?raw=true)

The results display the title, rating and price range of the recipe.  When clicked, detailed information about the recipe are displayed.

![Screenshot](/assets/img/screenshot-dinein-results2.PNG?raw=true)

The additional information includes the recipe summary, instructions and the cook time.  Also included in this view is an Add to Favorites button. Once clicked, the recipe id and name are stored in localStorage.  The heart icon is shaded red for saved items and white for nonsaved items.

### Dineout page
#### Page with restaurant filters (dineout.html)
![Screenshot](/assets/img/screenshot-dineout.PNG?raw=true)

A modal is displayed everytime a user accesses the dineout page.  It includes input fields for the city and zip.  (Having one of those fields is helpful in calling the Yelp API).

![Screenshot](/assets/img/screenshot-modal.PNG?raw=true)

The dineout page is accessed via the "Dine Out" link in the top navigation or from the home page.  It includes a left navbar with the filters:

- Popular Foods
- By Cuisine
- By City
- By Zip
- By Radius
- By Price

Users are able to use these filters and click the Search button to display the results.  Alternatively, the page also includes 6 speedy eat filter images.  Once clicked, the following filters are applied and sent to the Yelp API:

- Spicy: "thai", "korean", "indian", "chicken_wings"
- Savory: "spanish", "greek", "indian", "italian"
- Cheap Eats: "barbeque", "chicken_wings", "chili", "cafes", "diners"
- Special Occasion: "french", "italian", "steak"
- Healthy: "vegan", "vegetarian", "salad"
- Surprise: "local_flavors", "hot_and_new"

Once the user selects their filters via the left hand, or speedy eat filter images, the Yelp API is called and the filter images are hidden from the page.  While the page loads, a loading image will display until the results are then displayed on the screen.

The page renders the results in the same manner as the dinein page.

### Dunno page
#### Page with both recipe and restaurant filters (dunno.html)
![Screenshot](/assets/img/screenshot-dunno.PNG?raw=true)

A modal is displayed everytime a user accesses the dunno page.  It includes input fields for the city and zip.  (Having one of those fields is helpful in calling the Yelp API).

Users are able to use the 5 yellow mood cards to filter the results.  Once all 5 cards have been selected, the results are rendered on the page.  Alternatively, users can click the red "Surprise Me" button to bring back random recipes and restaurants.  The filters for the filter cards are included in the below.
![Screenshot](/assets/img/screenshot-dunno-analyzer.png?raw=true)

Optional filters are also included on the left.  The page renders the results in the same manner as the dinein and dineout pages.

### About page
#### Page with our amazing team members (about.html)
![Screenshot](/assets/img/screenshot-about.PNG?raw=true)

### Favorites page
#### Page that displays all saved recipes/restaurants (favorites.html)
![Screenshot](/assets/img/screenshot-favorites.PNG?raw=true)

All favorites that are stored in localStorage are pulled into the page as hyperlinks.  Each hyperlink directs to the additional information for that favorite.

## Setup/Installation Requirements
* Clone this repository.
* Open app in your browser.

## Known Bugs
Site has been passed through the W3C HTML/CSS validation service.
* One minor bug: On dineout page, do not include both city AND zip. Instead, only include one or the other.  This will be resolved in future iterations.
* Use Google Chrome (preferred), Firefox or Edge for jQuery to render properly

## Technologies Used
* HTML
* CSS
* JavaScript
* jQuery
* The following libraries are used:
    * Font Awesome
    * Google Fonts
    * Bulma Framework
    * Balsamic
    * Moqups
* The following APIs are used:
    * Yelp Fusion API
    * Spoonacular Food API

## Contribution Guidelines
Direct link to repository: https://github.com/stithac/project1_group7/
