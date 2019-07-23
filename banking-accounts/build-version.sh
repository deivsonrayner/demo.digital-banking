IBM_CLOUD_REGION=us
REPO_NAMESPACE=digital-banking

if [ -z $2 ]
then
  IMAGE_NAME=banking-account
fi

if [ -z $1 ] 
then
  echo "Você precisa informar uma versão para a Imagem"
else
docker build . -t ${IBM_CLOUD_REGION}.icr.io/${REPO_NAMESPACE}/${IMAGE_NAME}:$1
docker push ${IBM_CLOUD_REGION}.icr.io/${REPO_NAMESPACE}/${IMAGE_NAME}:$1
fi
