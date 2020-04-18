
import React from 'react';


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
  IonCardHeader,
  IonCardTitle,
  IonMenuButton,
  IonSlide,
  IonSlides,
  IonImg,
  IonText,
  IonCol,
  IonRow,
  IonIcon
} from "@ionic/react";

import './SelectStyle.css'
import StyleOne from "./../Photos/boldIcon.svg";
import StyleTwo from "./../Photos/cleanIcon.svg";
import StyleThree from "./../Photos/everIcon.svg";

type SelectedImage = {
  identifier: string,
  selectImagePath: string,
  croppedImagePath: string,
  quantity: number
}

type Style = {
  name: string,
  img: any
}

type State = {
    activeStyle: Style,
    availableStyles: Style[]
}

export class SelectStyleContent extends React.Component<{
  selectedImages: SelectedImage[],
  updateActiveStyle: (newStyle: string) => void}, State> {
    constructor(props: any) {
      super(props);
  
      this.state = {
        activeStyle: {
          name: 'StyleOne',
          img: StyleOne
        },
        availableStyles:[{
          name: 'StyleOne',
          img: StyleOne
        },
        {
          name: 'StyleTwo',
          img: StyleTwo
        },
        {
          name: 'StyleThree',
          img: StyleThree
        }]
      }
  }

  getSlideOptions() {
    let width = window.innerWidth;
    let numberofSlide = Math.floor(width/400)

    return {
        slidesPerView: numberofSlide,
        coverflowEffect: {
          stretch: 0,
          depth: 100,
          modifier: 1,
        },
        loop: false,
        speed: 1000,
        autoplay: 3000
    }
  }

  GetAvailableStyles(){
    return this.state.availableStyles.map(style =>
      <IonSlide>
         <button onClick={() => this.UpdateActiveStyle(style)}>
        <IonCard>
            <img src={style.img}></img>
            <IonCardHeader>
                <IonCardTitle>
                    {style.name}
                </IonCardTitle>
            </IonCardHeader>
        </IonCard>
        </button>
      </IonSlide>
      )
  }

  UpdateActiveStyle(style: any): void {
    this.setState({activeStyle: style});
    this.props.updateActiveStyle(style);
    /// i need to propogate this thorugh to start page
}
  
  createPreviewForSelectedPhotos (photos: SelectedImage[]){
    let previews = photos.map(photo => 
    <IonCard className="borderImage">
      <IonCardContent>
      <div className="div">
        <img src={this.state.activeStyle.img} className="first"/>
        <IonImg  src={photo.croppedImagePath} className="second" ></IonImg>
      </div>
      </IonCardContent>
    </IonCard>
    )
    return previews
  }


  render() {
    return(
      <IonCard>
        <IonCardHeader>
          <IonSlides options={this.getSlideOptions()}>
            {this.GetAvailableStyles()}
          </IonSlides>
        </IonCardHeader>
      <IonCardContent>
        {this.createPreviewForSelectedPhotos(this.props.selectedImages)}
      </IonCardContent>
  </IonCard>
    )
 }
}

export default SelectStyleContent