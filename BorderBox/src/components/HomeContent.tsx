
import React from 'react';
import './HomeComponent.css'

import { menu, arrowBack, logoInstagram } from 'ionicons/icons'

import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonList,
  IonItem,
  IonLabel,
  IonInput,
  IonButton,
  IonButtons,
  IonCard,
  IonFooter,
  IonPage,
  IonCardContent,
  IonMenuButton,
  IonSlide,
  IonSlides,
  IonText,
  IonCol,
  IonRow,
  IonIcon,
  IonGrid,
  IonCardTitle,
  IonCardHeader,
  IonImg,
  IonItemDivider
} from "@ionic/react";

import ReactPlayer from 'react-player'

import ReviewImage from './../Images/ReviewImages.jpg'

type State = {
    reviewSlides: string[]
}

export class HomeContent extends React.Component<{}, State> {
    constructor(props: any) {
      super(props);
  
      this.state = {
          reviewSlides: ['Slide One', 'Slide Two', 'Slide Three', 'Slide Four']
      }
  }

  getSlideOptions() {
    let width = window.innerWidth;
    let numberofSlide = Math.floor(width/400)

    return {
        slidesPerView: numberofSlide,
        coverflowEffect: {
          rotate: 50,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows: true,
        },
        loop: true,
        speed: 1000,
        autoplay: 3000
    }
  }


  GetReviewSlides(){
      let displayReviewSlides = this.state.reviewSlides.map(slide => 
        <IonSlide>
            <IonCard>
                <img src={ReviewImage}></img>
                <IonCardHeader>
                    <IonCardTitle>
                        {slide}
                    </IonCardTitle>
                </IonCardHeader>
                <IonCardContent>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus iaculis mollis ligula sed ultrices.
                </IonCardContent>
            </IonCard>
        </IonSlide>
        )
      return (displayReviewSlides)
  }


  render() {
    return(
        <IonCard>
            <IonCardHeader>
                <IonCardTitle>
                    Home
                </IonCardTitle>
            </IonCardHeader>
            <IonCardContent>
            <IonGrid>
                <IonItemDivider>
                    <IonRow>
                           Introduction 
                    </IonRow>
                </IonItemDivider>
                <ReactPlayer classname="player"
                          width='100%'
                          height='100%'
                          url='https://www.youtube.com/watch?v=o_RXZyojl8k&list=RDo_RXZyojl8k&start_radio=1' playing/>
                <IonItemDivider>
                </IonItemDivider>
                <IonSlides options={this.getSlideOptions()}>
                        {this.GetReviewSlides()}
                </IonSlides>
                <IonCard>
                    <IonHeader>
                        <IonCardTitle>
                            Price needs centering
                        </IonCardTitle>
                    </IonHeader>
                </IonCard>
                Buttons to be divided into 3rds
                <IonRow>
                    <IonCol>
                        Terms of Use
                    </IonCol>
                    <IonCol>
                        Private Policy
                    </IonCol>
                    <IonCol>
                        Contact
                    </IonCol>
                </IonRow>
            </IonGrid>
            </IonCardContent>
        </IonCard>
        
    )
 }
}

export default HomeContent