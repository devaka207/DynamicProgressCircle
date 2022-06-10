React Native percentage based progress circle

1.So, let’s get started. Firstly, we will try to create a circle in css for scenarios when the progress is 0 percent, this circle will act as the bottom layer in our css design. For now, the widths I would be taking would be hard coded. Later on I will try to make this component accept its dimensions from outside as props. saved in styles
2.Now, lets add some borders to this square. The border width would determine the thickness of the circular border. One thing to note here is that for react native the border seems to be a part of the width or height of the container, so the borders would occupy space within the square. To add the border width, add the following property to our styles object.
3.converting this square to a circle. To do this, we have to add a border radius of half the width of the square like so:
borderRadius: 100
4.At this point, we only have the base layer for our design. Now, we will create the second layer which will basically be placed on top of this base layer. To do this, we create another view inside our parent view, assign it the same width and height as that of the parent view and give it a position of absolute. ( since we will be adding more child views, we don’t want flexbox to interfere, hence the position of absolute).
5.Now we have a semi circle in the second layer which exactly overlays the circle of the bottom layer. The only important thing left to do now is rotate the semicircle to indicate progress. Since, we have a semi-circle, we will be able to only indicate progress from 0 to 50 percent using it. Let’s first try to get that done and then we’ll see how to add progress from 50 to 100 percent. By default the origin for any element is located at its centre. For our case this is the centre of the square view which also happens to be the centre of the circle. This is great news for us since react native does not support the css transform-origin property. ( And co-incidentally we want to rotate the second layers circle around its centre). Okay, so let’s rotate our circle by 45 degrees:
transform:[{rotateZ: ‘45deg’}]
The Z-axis passes through the centre of the circle, and you can imagine it as the axis that would come outside the screen of your device. So, you can guess how the rotation of 45 degrees around this axis would affect our circle.
6.in above code we have also handled cases where the percentage is greater than 50. Have also done some minor code refactoring here. Now, if we pass 80 percent as a prop to our component.
7.We do this by adding a text tag to the parent view and displaying the percent value from props inside it.
8.Now We pass this percent using textinput view then passing that variable to props so that it dynamically passed to props whenever the value changes
