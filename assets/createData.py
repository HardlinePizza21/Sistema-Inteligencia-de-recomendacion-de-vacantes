from faker import Faker
import random
import json
from datetime import datetime, timedelta
from pymongo import MongoClient

fake = Faker("es_ES")

# Opciones de datos ficticios
nombresVacantes = {
  "Asesor Comercial Freelance": [random.randint(1500000, 1600000) for _ in range(5)],
  "Analista de Datos": [random.randint(2500000, 3200000) for _ in range(5)],
  "Diseñador UX/UI": [random.randint(1400000, 4400000) for _ in range(5)],
  "Gerente de Proyecto": [random.randint(1900000, 3000000) for _ in range(5)],
  "Analista de impuestos": [random.randint(2500000, 3200000) for _ in range(5)],
  "Especialista de salud": [random.randint(4800000, 5500000) for _ in range(5)],
  "Auxiliar Motorizados Con O Sin Experiencia Para Mosquera Cundinamarca": [random.randint(1422000, 2500000) for _ in range(5)],
  "Motorizado con o sin experiencia": [random.randint(1423000, 2500000) for _ in range(5)],
  "Bachilleres con o sin experiencia con moto para Entrega publicitaria": [random.randint(1423000, 2500000) for _ in range(5)],
  "Arquitecto Soluciones": [random.randint(7000000, 8000000) for _ in range(5)],
  "Desarrollador Backend": [random.randint(5000000, 6000000) for _ in range(5)],
  "Ingeniero de Plataforma y Nube": [random.randint(6000000, 7000000) for _ in range(5)],
  "Desarrollador Backend Node JS": [random.randint(7000000, 8000000) for _ in range(5)], 
  "Desarrollador React Native": [random.randint(3000000, 4000000) for _ in range(5)],
  "Desarrollador Fullstack Node.js + React": [random.randint(4500000, 5500000) for _ in range(5)],
  "Desarrollador Frontend en Angular y React": [random.randint(1600000, 2600000) for _ in range(5)],
  "Desarrollador Full Stack con Python/Node JS y React": [random.randint(7000000, 8000000) for _ in range(5)],
  "Especialista soporte de aplicaciones": [random.randint(3000000, 4000000) for _ in range(5)],
  "Desarrolladora Frontend": [random.randint(2000000, 3000000) for _ in range(5)],
  "Desarrollador Full Stack PHP": [random.randint(4000000, 5000000) for _ in range(5)],
  "Desarrollador Full Stack": [random.randint(5000000, 6000000) for _ in range(5)],
  "C# Software Developer": [random.randint(4000000, 6000000) for _ in range(5)],
  "Técnico Eléctrico C": [random.randint(2000000, 3000000) for _ in range(5)],
  "Técnico Mecánico C": [random.randint(1800000, 2500000) for _ in range(5)],
  "Técnico Electromecánico C": [random.randint(2000000, 3000000) for _ in range(5)],
  "Conductor Nacional / Licencia C2": [random.randint(1500000, 2000000) for _ in range(5)],
  "Técnico en Mantenimiento Locativo": [random.randint(1800000, 2000000) for _ in range(5)],
  "Conductor de Cargue y Descargue de Mercancía en Bogotá": [random.randint(1423500, 2000000) for _ in range(5)],
  "Desarrollador Senior .NET": [random.randint(6000000, 8000000) for _ in range(5)],
  "Especialista en Creación de Contenido y Pauta Digital": [random.randint(5000000, 7000000) for _ in range(5)],
  "Practicante Sena Logística CCS": [random.randint(1423500, 1500000) for _ in range(5)],
  "Auxiliar de Diseño Gráfico Para Tiendas": [random.randint(1424000, 2000000) for _ in range(5)],
  "Practicante de seguridad y salud en el trabajo": [random.randint(1423500, 1500000) for _ in range(5)],
  "Administrative Assistant": [random.randint(2500000, 3000000) for _ in range(5)],
  "Aprendiz de salud ocupacional": [random.randint(1423500, 1500000) for _ in range(5)],
  "Operario De Cultivo Y Poscosecha": [random.randint(1423500, 1500000) for _ in range(5)],
  "Operario Agricola / Ubate": [random.randint(1423000, 1500000) for _ in range(5)],
  "Regente Administrativo - Supernumerario - Montería": [random.randint(2000000, 2500000) for _ in range(5)],
  "Asistente Junior - Medellín": [random.randint(2000000, 3000000) for _ in range(5)],
  "Vendedor(a) Dermocosmética Supernumeraria Medellín Y Área Metropolitana": [random.randint(1400000, 1500000) for _ in range(5)],
  "Asistente Junior - Bogotá": [random.randint(2000000, 3000000) for _ in range(5)],
  "Aprendices Administrativos": [random.randint(1423500, 1500000) for _ in range(5)],
  "Estudiante Auxiliar de logística / Contrato de aprendizaje": [random.randint(1423500, 1500000) for _ in range(5)],
  "Aprendiz en Programación de Software": [random.randint(711750, 1423500) for _ in range(5)],
  "Aprendiz en Diseño Gráfico": [random.randint(711750, 1423500) for _ in range(5)],
  "Auxiliar De Farmacia - Supernumerario - Bogotá": [random.randint(1400000, 1500000) for _ in range(5)],
  "Estudiante en Practica Seleccion": [random.randint(1500000, 2000000) for _ in range(5)],
  "Operador De Tienda Ara Fines De Semana Suba Bogota": [random.randint(389000, 389000) for _ in range(5)],
  "Operador De Tienda Ara Fines De Semana Usaquen Bogota": [random.randint(389000, 389000) for _ in range(5)],
  
}
empresas = {
  "Asesor Comercial Freelance": [fake.company() for _ in range(5)],
  "Analista de Datos": [fake.company() for _ in range(5)],
  "Diseñador UX/UI": [fake.company() for _ in range(5)],
  "Gerente de Proyecto": [fake.company() for _ in range(5)],
  "Analista de impuestos": [fake.company() for _ in range(5)],
  "Especialista de salud": [fake.company() for _ in range(5)],
  "Auxiliar Motorizados Con O Sin Experiencia Para Mosquera Cundinamarca": [fake.company() for _ in range(5)],
  "Motorizado con o sin experiencia": [fake.company() for _ in range(5)],
  "Bachilleres con o sin experiencia con moto para Entrega publicitaria": [fake.company() for _ in range(5)],
  "Arquitecto Soluciones": [fake.company() for _ in range(5)],
  "Desarrollador Backend": [fake.company() for _ in range(5)],
  "Ingeniero de Plataforma y Nube": [fake.company() for _ in range(5)],
  "Desarrollador Backend Node JS": [fake.company() for _ in range(5)],
  "Desarrollador React Native": [fake.company() for _ in range(5)],
  "Desarrollador Fullstack Node.js + React": [fake.company() for _ in range(5)],
  "Desarrollador Frontend en Angular y React": [fake.company() for _ in range(5)],
  "Desarrollador Full Stack con Python/Node JS y React": [fake.company() for _ in range(5)],
  "Especialista soporte de aplicaciones": [fake.company() for _ in range(5)],
  "Desarrolladora Frontend": [fake.company() for _ in range(5)],
  "Desarrollador Full Stack PHP": [fake.company() for _ in range(5)],
  "Desarrollador Full Stack": [fake.company() for _ in range(5)],
  "C# Software Developer": [fake.company() for _ in range(5)],
  "Técnico Eléctrico C": [fake.company() for _ in range(5)],
  "Técnico Mecánico C": [fake.company() for _ in range(5)],
  "Técnico Electromecánico C": [fake.company() for _ in range(5)],
  "Conductor Nacional / Licencia C2": [fake.company() for _ in range(5)],
  "Técnico en Mantenimiento Locativo": [fake.company() for _ in range(5)],
  "Conductor de Cargue y Descargue de Mercancía en Bogotá": [fake.company() for _ in range(5)],
  "Desarrollador Senior .NET": [fake.company() for _ in range(5)],
  "Especialista en Creación de Contenido y Pauta Digital": [fake.company() for _ in range(5)],
  "Practicante Sena Logística CCS": [fake.company() for _ in range(5)],
  "Auxiliar de Diseño Gráfico Para Tiendas": [fake.company() for _ in range(5)],
  "Practicante de seguridad y salud en el trabajo": [fake.company() for _ in range(5)],
  "Administrative Assistant": [fake.company() for _ in range(5)],
  "Aprendiz de salud ocupacional": [fake.company() for _ in range(5)],
  "Operario De Cultivo Y Poscosecha": [fake.company() for _ in range(5)],
  "Operario Agricola / Ubate": [fake.company() for _ in range(5)],
  "Regente Administrativo - Supernumerario - Montería": [fake.company() for _ in range(5)],
  "Asistente Junior - Medellín": [fake.company() for _ in range(5)],
  "Vendedor(a) Dermocosmética Supernumeraria Medellín Y Área Metropolitana": [fake.company() for _ in range(5)],
  "Asistente Junior - Bogotá": [fake.company() for _ in range(5)],
  "Aprendices Administrativos": [fake.company() for _ in range(5)],
  "Estudiante Auxiliar de logística / Contrato de aprendizaje": [fake.company() for _ in range(5)],
  "Aprendiz en Programación de Software": [fake.company() for _ in range(5)],
  "Aprendiz en Diseño Gráfico": [fake.company() for _ in range(5)],
  "Auxiliar De Farmacia - Supernumerario - Bogotá": [fake.company() for _ in range(5)],
  "Estudiante en Practica Seleccion": [fake.company() for _ in range(5)],
  "Operador De Tienda Ara Fines De Semana Suba Bogota": [fake.company() for _ in range(5)],
  "Operador De Tienda Ara Fines De Semana Usaquen Bogota": [fake.company() for _ in range(5)],
}

ubicaciones = [
  "Bogotá",
  "Medellín", "Cali", "Barranquilla", "Cartagena", "Bucaramanga",
  "Pereira", "Manizales", "Santa Marta", "Ibagué", "Cúcuta",
  "Villavicencio", "Armenia", "Neiva", "Popayán", "Montería"
]

tipos_contrato = [
  {"tipo": "Término fijo", "tiempo": ""},
  {"tipo": "Indefinido", "tiempo": "N/A"},
  {"tipo": "Freelance", "tiempo": "Por proyecto"}
]

cargos = ["Técnico.", "Doctorado.", "Tecnólogo", "Profesional.", "Bachillerato completo.", "Especialización/ Maestría."]

palabras_clave_base = {
  "Asesor Comercial Freelance": ["ventas", "negociación", "clientes", "freelance", "comercial"],
  "Analista de Datos": ["análisis", "datos", "SQL", "Python", "visualización"],
  "Diseñador UX/UI": ["diseño", "prototipos", "Figma", "experiencia de usuario", "interfaz"],
  "Gerente de Proyecto": ["gestión", "SCRUM", "liderazgo", "planificación", "proyectos"],
  "Analista de impuestos": ["impuestos", "contabilidad", "normativa", "declaraciones", "finanzas"],
  "Especialista de salud": ["salud", "pacientes", "diagnóstico", "tratamiento", "medicina"],
  "Auxiliar Motorizados Con O Sin Experiencia Para Mosquera Cundinamarca": ["rigadista", "Moto", "Entrega Publicitaria", "Consumo Masivo", "Papeles al día"],
  "Motorizado con o sin experiencia": ["rigadista", "Moto", "Entrega Publicitaria", "Consumo Masivo", "Papeles al día"],
  "Bachilleres con o sin experiencia con moto para Entrega publicitaria": ["Brigadista", "Moto", "Entrega Publicitaria", "Consumo Masivo", "Papeles al día"],
  "Arquitecto Soluciones": ["arquitectura", "soluciones", "sistemas", "infraestructura", "tecnología"],
  "Desarrollador Backend": ["backend", "API", "Node.js", "bases de datos", "programación"],
  "Ingeniero de Plataforma y Nube": ["plataforma", "nube", "AWS", "Azure", "infraestructura"],
  "Desarrollador Backend Node JS": ["Node.js", "JavaScript", "backend", "API REST", "microservicios"],
  "Desarrollador React Native": ["React Native", "JavaScript", "Mobile", "iOS", "Android"],
  "Desarrollador Fullstack Node.js + React": ["Node.js", "React", "Fullstack", "JavaScript", "API REST"],
  "Desarrollador Frontend en Angular y React": ["Angular", "React", "Frontend", "TypeScript", "UI/UX"],
  "Desarrollador Full Stack con Python/Node JS y React": ["Python", "Node.js", "React", "Fullstack", "API REST"],
  "Especialista soporte de aplicaciones": ["soporte", "aplicaciones", "infraestructura", "diagnóstico", "tecnología"],
  "Desarrolladora Frontend": ["Frontend", "HTML", "CSS", "JavaScript", "React"],
  "Desarrollador Full Stack PHP": ["PHP", "Full Stack", "MySQL", "Laravel", "Backend"],
  "Desarrollador Full Stack": ["Full Stack", "JavaScript", "Node.js", "React", "API REST"],
  "C# Software Developer": ["C#", "desarrollo", "software", "programación", "aplicaciones"],
  "Técnico Eléctrico C": ["eléctrico", "mantenimiento", "circuitos", "instalaciones", "electricidad"],
  "Técnico Mecánico C": ["mecánico", "mantenimiento", "máquinas", "reparación", "técnico"],
  "Técnico Electromecánico C": ["electromecánico", "mantenimiento", "máquinas", "eléctrico", "reparación"],
  "Conductor Nacional / Licencia C2": ["conductor", "licencia C2", "transporte", "vehículos", "nacional"],
  "Técnico en Mantenimiento Locativo": ["mantenimiento", "locativo", "reparaciones", "infraestructura", "técnico"],
  "Conductor de Cargue y Descargue de Mercancía en Bogotá": ["conductor", "cargue", "descargue", "mercancía", "logística"],
  "Desarrollador Senior .NET": [".NET", "C#", "desarrollo", "backend", "aplicaciones"],
  "Especialista en Creación de Contenido y Pauta Digital": ["contenido", "pauta", "digital", "marketing", "creatividad"],
  "Practicante Sena Logística CCS": ["logística", "SENA", "aprendizaje", "almacén", "distribución"],
  "Auxiliar de Diseño Gráfico Para Tiendas": ["diseño gráfico", "tiendas", "Photoshop", "ilustración", "branding"],
  "Practicante de seguridad y salud en el trabajo": ["seguridad", "salud", "trabajo", "riesgos", "prevención"],
  "Administrative Assistant": ["asistente", "administrativo", "organización", "oficina", "gestión"],
  "Aprendiz de salud ocupacional": ["salud ocupacional", "aprendizaje", "riesgos", "prevención", "trabajo"],
  "Operario De Cultivo Y Poscosecha": ["cultivo", "poscosecha", "agricultura", "producción", "operario"],
  "Operario Agricola / Ubate": ["agricultura", "operario", "cultivo", "producción", "campo"],
  "Regente Administrativo - Supernumerario - Montería": ["administración", "supernumerario", "gestión", "farmacia", "liderazgo"],
  "Asistente Junior - Medellín": ["asistente", "junior", "oficina", "gestión", "organización"],
  "Vendedor(a) Dermocosmética Supernumeraria Medellín Y Área Metropolitana": ["ventas", "dermocosmética", "supernumerario", "clientes", "productos"],
  "Asistente Junior - Bogotá": ["asistente", "junior", "oficina", "gestión", "organización"],
  "Aprendices Administrativos": ["aprendiz", "administrativo", "gestión", "oficina", "aprendizaje"],
  "Estudiante Auxiliar de logística / Contrato de aprendizaje": ["logística", "auxiliar", "aprendizaje", "almacén", "distribución"],
  "Aprendiz en Programación de Software": ["programación", "software", "aprendizaje", "desarrollo", "tecnología"],
  "Aprendiz en Diseño Gráfico": ["diseño", "gráfico", "Photoshop", "ilustración", "branding"],
  "Auxiliar De Farmacia - Supernumerario - Bogotá": ["farmacia", "auxiliar", "supernumerario", "medicamentos", "clientes"],
  "Estudiante en Practica Seleccion": ["selección", "práctica", "recursos humanos", "aprendizaje", "gestión"],
  "Operador De Tienda Ara Fines De Semana Suba Bogota": ["operador", "tienda", "ventas", "atención al cliente", "fines de semana"],
  "Operador De Tienda Ara Fines De Semana Usaquen Bogota": ["operador", "tienda", "ventas", "atención al cliente", "fines de semana"],
  
}

# Generar vacantes ficticias
vacantes = []
for _ in range(400):
    nombre_vacante = random.choice(list(nombresVacantes.keys()))
    
    empresa = random.choice(empresas[nombre_vacante]),
    
    contrato = random.choice(tipos_contrato)
    
    if(contrato["tipo"] == "Término fijo"):
      contrato["tiempo"] = f"{random.randint(1, 5)} años"
    
    requisitos = {
        "cargo": random.choice(cargos)
    }
    
    if(requisitos["cargo"] != "Bachillerato completo."):
      requisitos["experiencia"] = f"{random.randint(1,8)} años"
    
    palabrasClave = []
    
    
    for i in range(len(palabras_clave_base[nombre_vacante])):
      palabraAleatoria = random.choice(palabras_clave_base[nombre_vacante])
      if(palabraAleatoria not in palabrasClave):
        palabrasClave.append(palabraAleatoria)

    descripcion = fake.text(max_nb_chars=random.randint(20, 40))
    
    
    info_ampliada = {
        "palabrasClave": palabrasClave,
        "descripcion": descripcion
    }
    
    vacante = {
        "nombre_vacante": nombre_vacante,
        "empresa": empresa[0],
        "ubicacion": random.choice(ubicaciones),        
        "tipo_contrato": contrato,
        "salario": random.choice(nombresVacantes[nombre_vacante]),
        "requisitos": requisitos,
        "informacionAmpliada": info_ampliada,
        "fecha_publicacion": fake.date_time_between(start_date='-30d', end_date='now')
    }
    vacantes.append(vacante)
    

# Conectar a la base de datos MongoDB
client = MongoClient("mongodb+srv://HardlinePizza21:samuel14madrid@vectorsearch.oqgdznm.mongodb.net/?retryWrites=true&w=majority&appName=VectorSearch")
db = client["mi_base_de_datos"]
collection = db["vacantes"]
collection.insert_many(vacantes)


print("Vacantes subidas a la base de datos MongoDB")

# # * Guardar en un archivo JSON
# with open("vacantes.json", "w", encoding="utf-8") as f:
#     json.dump(vacantes, f, indent=4, ensure_ascii=False)

# print("Vacantes generadas y guardadas en vacantes.json")
