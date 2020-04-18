
import React from 'react';

import { menu, arrowDown, logoInstagram } from 'ionicons/icons'
import StripeCheckout from 'react-stripe-checkout';
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
  IonMenuButton,
  IonSlide,
  IonSlides,
  IonText,
  IonCol,
  IonRow,
  IonIcon,
  IonCardTitle
} from "@ionic/react";

type SelectedImage = {
  identifier: string,
  selectImagePath: string,
  croppedImagePath: string,
  quantity: number
}

type State = {
}

export class CompleteContent extends React.Component<{
  selectedImages: SelectedImage[],
  activeStyle: string,
  closeCheckout: () => void}, State> {
    constructor(props: any) {
      super(props);
  
      this.state = {
      }
  }

  handleSubmit = (token: any) =>{
    console.log('Attempting To Charge Card')
    console.log(token)
    console.log('Processing')
    this.processInformation(token)
    console.log('Done Processing')
    //this.stripeTokenHandler(token)
  }

  async processInformation(token: any){
    const details = {
      email: token.email,
      city: token.card.address_city,
      country: token.card.address_country,
      lineone: token.card.address_line1,
      name: token.card.name,
      style: this.props.activeStyle,
      quantity: this.props.selectedImages.length
      }
      console.log(details)
      const response = await fetch('https://us-central1-teststripe-898de.cloudfunctions.net/ProcessData', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(details),
      });
      console.log('Processing Response Recieved')
      let returned = response.json()
      console.log(returned)
  }

  async stripeTokenHandler(token: any) {

    const paymentData = {
      stripeToken: token.id,
      quantity: this.props.selectedImages.length,
      style: this.props.activeStyle,
    };

    console.log('Sending Payment')
    const response = await fetch('https://us-central1-teststripe-898de.cloudfunctions.net/stripeTest', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(paymentData),
    });
    console.log('Response Recieved')
    let returned = response.json()
    console.log(returned)
  }


  render() {
    return(
      <IonCard>
        <IonCardHeader>
          <IonHeader>
              <IonToolbar>
                  <IonRow className="headerRow">
                    <IonButton  onClick={this.props.closeCheckout} >
                      <IonIcon src={arrowDown}></IonIcon>
                    </IonButton>
                    <IonTitle> Order Summary </IonTitle>
                 </IonRow>
                </IonToolbar>
            </IonHeader>
      </IonCardHeader>
      <IonCardContent>
        <IonRow>
          {`(Summary?) You need to style this: Number of Photos ${this.props.selectedImages.length}`}
        </IonRow>
        <IonRow>
        <StripeCheckout
            stripeKey="pk_test_cFsAVCGnWPQW75xZfBrhg3mf00NWliuU2M"
            billingAddress
            shippingAddress
            description="Paying for Purchase"
            token={this.handleSubmit}
            label="Pay with 💳"
            zipCode
            />
        </IonRow>
      </IonCardContent>
    </IonCard>
    )
 }
}

export default CompleteContent