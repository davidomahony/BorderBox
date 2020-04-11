
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
  IonMenuButton,
  IonSlide,
  IonSlides,
  IonText,
  IonCol,
  IonRow,
  IonIcon
} from "@ionic/react";



type State = {
}

export class FileUploadContent extends React.Component<{}, State> {
    constructor(props: any) {
      super(props);
  
      this.state = {
      }
  }


  render() {
    return(
        <h1> This is file Upload</h1>
    )
 }
}

export default FileUploadContent