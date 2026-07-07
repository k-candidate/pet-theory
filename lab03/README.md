# Pet Theory

![Pet Theory Logo](https://github.com/rosera/pettheory/blob/main/images/pet_theory_logo.png "Pet Theory")

Twelve years ago, Lily started the Pet Theory chain of veterinary clinics. The Pet Theory chain has expanded rapidly over the last few years. Their old appointment scheduling system is not able to handle the increased load, so Lily is asking you to build a Google Cloud Platform system that scales better than the legacy solution.

Welcome to the Pet Theory Quest.

## Author: 

Martin Omander

## Architecture

![GSP644: Create a PDF with Cloud Run](https://github.com/rosera/pettheory/blob/main/images/gsp644-create-pdf.png "Pet Theory - GSP644")

## Description: 

Qwiklabs Quest based on the presentation "Pet Theory"

[GSP644 Lab 03 - Build a Serverless App with Cloud Run that Creates PDF files](https://google.qwiklabs.com/catalog_lab/2161)

In the lab, you will learn how to build a web app based on Cloud Run, that automatically converts files stored in Google Drive into PDFs stored in segregated Google Drive folders. 

* Develop an application to create a PDF
* How to create a Dockerfile for a NodeJS application
* Learn to deploy Cloud Run application
* Trigger a Cloud Run server based on Cloud Storage


## Notes

```bash
gcloud builds submit \
  --tag gcr.io/$GOOGLE_CLOUD_PROJECT/pdf-converter

gcloud run deploy pdf-converter \
  --image gcr.io/$GOOGLE_CLOUD_PROJECT/pdf-converter \
  --platform managed \
  --region us-east4 \
  --memory=2Gi \
  --no-allow-unauthenticated \
  --max-instances=1 \
  --set-env-vars PDF_BUCKET=$GOOGLE_CLOUD_PROJECT-processed

curl -X POST -H "Authorization: Bearer $(gcloud auth print-identity-token)" $SERVICE_URL

bash copy_files.sh
```
