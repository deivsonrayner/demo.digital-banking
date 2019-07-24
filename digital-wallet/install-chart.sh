echo "INSTALLING CHART: ${1} VERSION: ${2}"
helm package ./chart/${1}/
helm delete --purge ${1}
helm install --name ${1} ${1}-${2}.tgz
