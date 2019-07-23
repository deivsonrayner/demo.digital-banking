PROJECTS=./*

if [ "${1}" == '' ]; then
  echo "Informe a tag da imagem usando build-all-images.sh <tag>"
  exit 1
fi

for project in $PROJECTS
do
  if [ "${project:2}" != 'install-all-charts.sh' ] && [ "${project:2}" != 'build-all-images.sh' ] && [ "${project:2}" != 'fabric.cli-app' ] && [ "${project:2}" != 'remote-mongodb-service-entry.yaml' ] && [ "${project:2}" != 'remote-ibp-service-entry.yaml' ]; then
    echo "Building Image from Project: ${project:2}"
    cd ${project}
    ./build-version.sh ${1}
    cd ..
  fi
done 

