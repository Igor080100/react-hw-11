import React, { Component } from 'react';

interface IWindowSizeState {
   w: number;
   h: number;
}

export class WindowSize extends Component<{}, IWindowSizeState> {
   constructor(props: {}) {
      super(props);
      this.state = {
         w: window.innerWidth,
         h: window.innerHeight
      };
   }

   handleWindowSize = () => {
      this.setState({
         w: window.innerWidth,
         h: window.innerHeight
      });
   };

   componentDidMount() {
      window.addEventListener('resize', this.handleWindowSize);
   }

   componentWillUnmount() {
      window.removeEventListener('resize', this.handleWindowSize);
   }

   render() {
      return (
         <section>
            <div>
               <p>width: {this.state.w}</p>
               <p>height: {this.state.h}</p>
            </div>
         </section>
      );
   }
}