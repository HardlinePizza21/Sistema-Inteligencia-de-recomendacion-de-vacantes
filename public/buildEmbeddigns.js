//! Funcion que crea el texto para hacer el embedding
export const buildWeightedVacancyText = (data) => {
    
    let keyWords = "Palabras clave: "
    let title = "Trabajo: "
    let salary = "Salario: " 
    let company = "Empresa: "

    data.forEach(element => {

        const palabrasClave = element.palabrasClave.join(' ');

        keyWords += `${palabrasClave} `
        title += `${element.nombre_vacante} `
        salary += `${element.salario} `
        company += `${element.empresa} `
        
    });

    return `${keyWords} ${title} ${salary} ${company}`

}