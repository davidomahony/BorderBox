import React from 'react';

import './StartPage.css';

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
import Header from '../components/Header';
import Footer from '../components/Footer';
import HomeContent from '../components/HomeContent';
import FileUploadContent from '../components/FileUploadContent';
import SelectStyleContent from '../components/SelectStyleContent';
import CompleteContent from '../components/CompleteContent';

type SelectedImage = {
    identifier: string,
    selectImagePath: string
  }

type State = {
    activeContent: string,
    availableContexts: string[],
    selectedStyle: string,
    selectedImages: SelectedImage[],
    numberOfImages: number
}

export class Startpage extends React.Component<{}, State> {
    constructor(props: any) {
      super(props);
  
      this.state = {
        activeContent: "Home",
        availableContexts: ['Home', 'FileUpload', 'SelectStyle', 'Complete'],
        selectedStyle: 'StyleOne',
        selectedImages: [],
        numberOfImages: 0
      }
  }

  navigateForward = () => {
    let nextContentindex = this.state.availableContexts.indexOf(this.state.activeContent) + 1;
    this.setState({activeContent: this.state.availableContexts[nextContentindex]})
  }

  navigateBack = () => {
    let nextContentindex = this.state.availableContexts.indexOf(this.state.activeContent) - 1;
    this.setState({activeContent: this.state.availableContexts[nextContentindex]})
  }

  SetContent(){
    if (this.state.activeContent === 'Home')
    {
      return <HomeContent/>
    }
    if (this.state.activeContent === 'FileUpload')
    {
      return <FileUploadContent/>
    }
    if (this.state.activeContent === 'SelectStyle')
    {
      return <SelectStyleContent/>
    }
    if (this.state.activeContent === 'Complete')
    {
      return <CompleteContent/>
    }
  }

  render() {
    return(
      <IonPage className="maxWidth">
        <Header activeContent={this.state.activeContent} NavigateBack={this.navigateBack}></Header>
        <IonContent>
          {this.SetContent()}
        </IonContent>
        <Footer activeContent={this.state.activeContent} hasPhotosUploaded={this.state.numberOfImages !== 0} NavigateForward={this.navigateForward}/>
      </IonPage>
    )
 }
}

export default Startpage