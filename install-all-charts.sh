PROJECTS=./*

if [ "${1}" == '' ]; then
  echo "Informe o número da versão do chart usando install-all-charts.sh <NUMERO-VERSAO>"
  exit 1
fi

for project in $PROJECTS
do
  if [ "${project:2}" != 'install-all-charts.sh' ]; then
    echo "ATUALIZANDO PROJETO: ${project:2}"
    cd ${project}
    ./install-chart.sh ${project:2} ${1}
    cd ..
  fi
done 

