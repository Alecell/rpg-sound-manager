import { UserService } from 'services/user/user';
import { UrlParams } from 'interfaces/urlParams';
import { firestore } from 'config/firebase';
import { EFirestoreCollections } from 'enums/firestoreCollections';

export const userRequest = () => firestore
  .collection(EFirestoreCollections.USERS)
  .doc(UserService.getToken());

export const campaignRequest = (urlParams: UrlParams) => firestore
  .collection(EFirestoreCollections.USERS)
  .doc(UserService.getToken())
  .collection(EFirestoreCollections.CAMPAIGNS)
  .doc(urlParams.campaignId);

export const sessionRequest = (urlParams: UrlParams) => firestore
  .collection(EFirestoreCollections.USERS)
  .doc(UserService.getToken())
  .collection(EFirestoreCollections.CAMPAIGNS)
  .doc(urlParams.campaignId)
  .collection(EFirestoreCollections.SESSIONS)
  .doc(urlParams.sessionId);

export const sceneRequest = (urlParams: UrlParams) => firestore
  .collection(EFirestoreCollections.USERS)
  .doc(UserService.getToken())
  .collection(EFirestoreCollections.CAMPAIGNS)
  .doc(urlParams.campaignId)
  .collection(EFirestoreCollections.SESSIONS)
  .doc(urlParams.sessionId)
  .collection(EFirestoreCollections.SCENES)
  .doc(urlParams.sceneId);

export const mixRequest = (urlParams: UrlParams) => firestore
  .collection(EFirestoreCollections.USERS)
  .doc(UserService.getToken())
  .collection(EFirestoreCollections.CAMPAIGNS)
  .doc(urlParams.campaignId)
  .collection(EFirestoreCollections.SESSIONS)
  .doc(urlParams.sessionId)
  .collection(EFirestoreCollections.SCENES)
  .doc(urlParams.sceneId)
  .collection(EFirestoreCollections.MIXES)
  .doc(urlParams.mixId);
