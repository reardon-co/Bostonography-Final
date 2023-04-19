# Atlascople

Play the game live here: https://atlascople.netlify.app/

### Gameplay Overview

For my Spring 2023 final project in Bostonography (INSH 2102), I created Atlascople.

The object of Atlascople is to guess which Boston suburb the map's pin is in.

Taking inspiration from mechanics popularized by games like Wordle and Heardle, Atlascople gives players a location on an Atlascope layer zoomed in as far as possible. As players make guesses, the map slowly zooms outward, giving players a clearer picture on their surroundings. The game ends when a player either guesses the suburb correctly, or the map zooms out as far as possible, in which case the player runs out of guesses and loses.

### Project Strategy

As stated in my project abstract, I took the computational approaches track for my project. I wanted to utilize my knowledge as a Computer Science student to make a project that would be both engaging and educational for visitors. In the abstract, I also stated that I wanted to increase engagement with the Atlascope by creating a quiz-like game that uses Atlascope data. However, the Atlascope layer itself did not have a large variety of data. Additionally, using computer vision to gather data for a dataset was proving to be a tedious and buggy process.

However, the Atlascope layer did have latitude and longitude data, which could then be utilized to fetch additional data about a given point on the map. So, a core part of making my game work was by using the coordinates in tandem with OpenStreetMaps and the Nominatim API. This allowed me to access more details about a location when given latitude and longitude. It also allowed me to get lattitude and longitude coordinates when given a place.

Overall, I'm really happy how the project turned out. It is pretty engaging and helps visitors get familiar with an Atlascope layer.

### Technical Details

Although I said in my abstract that I would most likely use Python to create the game, I found it much easier to use React. This also helped streamline the hosting process, which has allowed Atlascople to be accessible by the public.

There were a couple of challenges with the project. 
Firstly, the Atlascope maps are not perfectly rectangular. However, Leaflet (which is used to display maps in JavaScript) takes in a rectangular bounding box for a map. Atlascople uses a function to fetch random coordinates from the bounding box, but sometimes this lands outside of the Atlascope layer. To remedy this, if there are errors loading image tiles in the initial render of the map, I force the website to refresh, which regenerates random coordinates. In the future, it would be useful to define a more detailed polygon bounds, which would help always pick valid coordinates.
Secondly, responses from different endpoints of the Nominatim API weren't uniform. I think this is due to OpenStreetMap's various schemas, but it was virtually impossible to do a search by suburb and limit it to Boston. So, I just fetched an overall search with the text provided by the user with Boston appended to it. In most cases, the correct data entry came up first in the results array, so usually it works. In the future, it might make more sense to provide a dropdown of all the possible suburb values on the map. This would make answering and scoring more consistent.

I hope this project helps visitors understand Atlascope layers and how different areas in Boston have changed to today.
