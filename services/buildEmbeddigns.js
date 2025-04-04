//! Funcion que crea el texto para hacer el embedding
export const buildWeightedVacancyText = (data, weights = {}) => {
    const { 
        keyWordsWeight = 1, 
        titleWeight = 1, 
        salaryWeight = 1, 
        companyWeight = 1 
    } = weights;

    const repeatText = (text, weight) => text.repeat(weight);

    const repeatTextArray = (array, weight) => 
        array.map(item => item.repeat(weight)).join(' ');

    const keyWords = repeatTextArray(data.informacionAmpliada.palabrasClave, keyWordsWeight);
    const title = repeatText(`Trabajo: ${data.nombre_vacante}`, titleWeight);
    const salary = repeatText(`Salario: ${data.salario}`, salaryWeight);
    const company = repeatText(`Empresa: ${data.empresa}`, companyWeight);

    return `Palabras clave:${keyWords} ${title} ${salary} ${company}`;

}