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
    selectImagePath: string,
    croppedImagePath: string,
    quantity: number
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

  ////////////                 Navigation 

  navigateForward = () => {
    let nextContentindex = this.state.availableContexts.indexOf(this.state.activeContent) + 1;
    this.setState({activeContent: this.state.availableContexts[nextContentindex]})
  }

  navigateBack = () => {
    let nextContentindex = this.state.availableContexts.indexOf(this.state.activeContent) - 1;
    this.setState({activeContent: this.state.availableContexts[nextContentindex]})
  }

  /////////////////////////////////////////////////////////////////

  ///////////////////////// Adding & Removing images


  addNewPhoto = (identifier: string, photUrl: string[]) => {
    let count = this.state.numberOfImages;
    let newPhotoCollection: SelectedImage[] = [];
    photUrl.forEach(photo =>
      {
        newPhotoCollection.push({identifier: `${count}`, selectImagePath: photo, croppedImagePath: photo, quantity: 1})
        this.setState({numberOfImages: count++})
        this.setState({selectedImages: newPhotoCollection})
      })
  }

  removePhoto = (identifier: string, photUrl: string) => {
    let newSelectedImages = this.state.selectedImages.filter(item => item.identifier !== identifier);
    this.setState({selectedImages: newSelectedImages})
  }

  updateFromCrop = (newImg: any, identifier: string) => {
    let imgToBeUpdated = this.state.selectedImages.find(img => img.identifier === identifier);
    if (imgToBeUpdated !== null && imgToBeUpdated !== undefined)
    {
      imgToBeUpdated.croppedImagePath = newImg;
      let newSelectedImages = this.state.selectedImages.filter(item => item.identifier !== identifier);
      newSelectedImages.push(imgToBeUpdated);
      this.setState({selectedImages: newSelectedImages})
      return;
    }
    console.log("Issue Updating Crop")
  }


  //////////////////////////////////////////////////////////////////

  SetContent(){
    if (this.state.activeContent === 'Home')
    {
      return <HomeContent/>
    }
    if (this.state.activeContent === 'FileUpload')
    {
      return <FileUploadContent 
      removePhoto={this.removePhoto} 
      activePhotos={this.state.selectedImages} 
      updateFromCrop={this.updateFromCrop}
      uploadPhoto={this.addNewPhoto}/>
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