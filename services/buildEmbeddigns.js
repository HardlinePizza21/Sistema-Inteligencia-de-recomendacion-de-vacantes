//! Funcion que crea el texto para hacer el embedding
export const buildWeightedVacancyText = (data, weights = {}) => {
    const { 
        keyWordsWeight = 1, 
        titleWeight = 1, 
        salaryWeight = 1, 
        companyWeight = 1,
        publishDateWeight = 1,
    } = weights;

    const repeatText = (text, weight) => text.repeat(weight);

    const repeatTextArray = (array, weight) => 
        array.map(item => item.repeat(weight)).join(' ');

    const keyWords = repeatTextArray(data.informacionAmpliada.palabrasClave, keyWordsWeight);
    const title = `Job: ${data.nombre_vacante.repeat(titleWeight)}`;
    const salary = `Salary: ${String(data.salario).repeat(salaryWeight)}`;
    const company = `Company: ${data.empresa.repeat(companyWeight)}`;
    const publishDate = `Publish date: ${String(data.fecha_publicacion).repeat(publishDateWeight)}`;

    return `${title} key words:${keyWords} ${salary} ${company} ${publishDate}`;

}