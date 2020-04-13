import React from 'react';

import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css'

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
  IonModal,
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
  IonImg
} from "@ionic/react";

import ImageCropper from './ImageCropper';

type State = {
    croppedImageUrl: any,
    croppedImage: any,
}

export class CropModal extends React.Component<{
    isVisible: boolean,
    imgIdentifier: string,
    closeModal: (img: any) =>  void,
    updateFromCrop: (img: any, id: string) =>  void,
    imageSource: string}, State> {
    constructor(props: any) {
      super(props); 
      this.state = {
        croppedImageUrl: this.props.imageSource,
        croppedImage: ''
      }
  }

  updatePreview = (preview: any) => {
    this.setState({croppedImageUrl: preview})
  }

  render() {
    return(
      <IonModal isOpen={this.props.isVisible}>
          <IonHeader>
              <IonTitle> Crop & Resize Image</IonTitle>
          </IonHeader>
          <IonContent>
              <ImageCropper updateCroppedPreview={this.updatePreview} updateCrop={(img: any) => this.props.updateFromCrop(img, this.props.imgIdentifier)} src={this.props.imageSource}>
              </ImageCropper>
          </IonContent>
          <IonFooter>
            <IonButton onClick={() => this.props.closeModal(this.state.croppedImageUrl)}>Close</IonButton>
            <IonButton onClick={() => this.props.updateFromCrop(this.state.croppedImageUrl, this.props.imgIdentifier)}> Confirm </IonButton>
          </IonFooter>
      </IonModal>
    )
 }
}

export default CropModal
