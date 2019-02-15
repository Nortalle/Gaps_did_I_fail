const envFile = require('find-config')('.env');
const querystring = require('querystring');
const parse5 = require('parse5');
const axios = require('axios');
const util = require('util');

require('dotenv').config({ path: envFile });

const client = axios.create({
    baseURL: 'https://gaps.heig-vd.ch',
    timeout: 200000,
});

const login = process.env.LOGIN;
const password = process.env.PASSWORD;
const submit = 'Entrer';

const numberToDisplay = 5;

const params = {
    login,
    password,
    submit,
};

client.post(`/consultation/notes/bulletin.php?id=${process.env.ID}`, querystring.stringify(params))
    .then((response) => {
        const document = parse5.parse(response.data);

        const tbodyChilds = document
            .childNodes[1]// html
            .childNodes[2]// body
            .childNodes[3]// div
            .childNodes[4]// div
            .childNodes[1]// table
            .childNodes[3]// tbody
            .childNodes;

        const lastModules = [];
        let nbrModules = 0;

        const lastCourses = [];
        let nbrCourses = 0;

        const size = tbodyChilds.length;

        for (let i = 0; i < size; i += 1) {
            const current = tbodyChilds[i];
            if (current.nodeName === 'tr') {
                if (current.childNodes[5] != null && current.childNodes[5].nodeName === 'td') {
                    const currentTD = current.childNodes[5];
                    if (currentTD.attrs != null && currentTD.attrs[0] != null) {
                        if (currentTD.attrs[0].name === 'class' && currentTD.attrs[0].value === 'transcript-left transcript-status') {
                            if (currentTD.childNodes[0] != null && currentTD.childNodes[0].value.includes('ussite')) {
                                if (current.childNodes != null
                                    && current.childNodes[1] != null
                                    && current.childNodes[1].childNodes != null
                                    && current.childNodes[1].childNodes[0] != null
                                    && current.childNodes[1].childNodes[0].value != null) {
                                    const { value } = current.childNodes[1].childNodes[0];
                                    lastModules[nbrModules % numberToDisplay] = value;
                                }
                                if (current.childNodes != null
                                    && current.childNodes[7] != null
                                    && current.childNodes[7].childNodes != null
                                    && current.childNodes[7].childNodes[0] != null
                                    && current.childNodes[7].childNodes[0].value != null) {
                                    const { value } = current.childNodes[7].childNodes[0];
                                    lastModules[nbrModules % numberToDisplay] += `\t${value}`;
                                }
                                nbrModules += 1;
                            }
                        } else if (currentTD.attrs[0].name === 'class' && currentTD.attrs[0].value === 'transcript-left') {
                            if (currentTD.childNodes[0] != null && (currentTD.childNodes[0].value.includes('ussite') || currentTD.childNodes[0].value.includes('Compens'))) {
                                if (current.childNodes != null
                                    && current.childNodes[3] != null
                                    && current.childNodes[3].childNodes != null
                                    && current.childNodes[3].childNodes[0] != null
                                    && current.childNodes[3].childNodes[0].value != null) {
                                    const { value } = current.childNodes[3].childNodes[0];
                                    lastCourses[nbrCourses % numberToDisplay] = value;
                                }
                                if (current.childNodes != null
                                    && current.childNodes[7] != null
                                    && current.childNodes[7].childNodes != null
                                    && current.childNodes[7].childNodes[0] != null
                                    && current.childNodes[7].childNodes[0].value != null) {
                                    const { value } = current.childNodes[7].childNodes[0];
                                    lastCourses[nbrCourses % numberToDisplay] += `\t${value}`;
                                }
                                nbrCourses += 1;
                            }
                        }
                    }
                }
            }
        }

        const nbrModulesToDisplay = lastModules.length;
        const nbrCoursesToDisplay = lastCourses.length;

        console.log(`Nombre de modules réussis : ${nbrModules}`);
        console.log(`Les ${nbrModulesToDisplay} derniers modules réussis:`);
        for (let i = 0; i < nbrModulesToDisplay; i += 1) {
            console.log(`   - ${lastModules[i]}`);
        }
        console.log(`Nombre de cours réussis : ${nbrCourses}`);
        console.log(`Les ${nbrCoursesToDisplay} derniers cours réussis:`);
        for (let i = 0; i < nbrCoursesToDisplay; i += 1) {
            console.log(`   - ${lastCourses[i]}`);
        }
    })
    .catch((error) => {
        console.log(util.inspect(error, false, null));
    });
