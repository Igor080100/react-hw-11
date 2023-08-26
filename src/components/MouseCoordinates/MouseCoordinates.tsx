import React, { Component } from 'react';

interface IMouseCoordinatesState {
   x: number;
   y: number;
}

export class MouseCoordinates extends Component<{}, IMouseCoordinatesState> {
   state: IMouseCoordinatesState = {
      x: 0,
      y: 0,
   };

   handleMouseMove = (event: MouseEvent) => {
      this.setState({
         x: event.clientX,
         y: event.clientY,
      });
   };

   componentDidMount() {
      window.addEventListener('mousemove', this.handleMouseMove);
   }

   componentWillUnmount() {
      window.removeEventListener('mousemove', this.handleMouseMove);
   }

   render() {
      const { x, y } = this.state;

      return (
         <div>
            <p>X: {x}</p>
            <p>Y: {y}</p>
         </div>
      );
   }
}

