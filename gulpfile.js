const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const sourcemaps = require('gulp-sourcemaps');
const uglify = require('gulp-uglify');
const obfuscate = require('gulp-obfuscate')
const imagemin = require('gulp-imagemin');

function comprimeImagens() {
    return gulp.src('./src/images/*')
        .pipe(imagemin())
        .pipe(gulp.dest('./build/images'));
}

function comprimeJavaScript(){
    return gulp.src('./src/scripts/*.js')
        .pipe(uglify())
        .pipe(obfuscate())
        .pipe(gulp.dest('./build/scripts'))
}

function compilaSass() {
    return gulp.src('./src/styles/main.scss') // função que recebe parametro de arquivos codigo fonte 
    .pipe(sourcemaps.init()) // incia gravador
    .pipe(sass({
        style: 'compressed'
    })) // pipe serve para encadear as funcoes que estivermos usando, receber a funcao de execucao do sass, compressar arquivo na saida(min)
    .pipe(sourcemaps.write('./maps')) // cria pasta de maps, para indicar código fonte do pré processamento
    .pipe(gulp.dest('./build/styles')) // envia arquivos compilados a uma determinada pasta
}

function funcaoPadrao(callback) {

    setTimeout(function(){
        console.log ('Executando via Gulp');
        callback();
    }, 2000);
}

exports.default = funcaoPadrao;

function dizOi(callback) {
    setTimeout(function() {
        console.log("Olá Gulp");
        dizTchau();
        callback();
    }, 1000);
}


function dizTchau() {
    console.log("Tchau Gulp");
}

exports.default = function() {
    gulp.watch('./src/styles/*.scss', {ignoreInitial: false}, gulp.series(compilaSass)) // Observa arquivos para atualizar de imediato
    gulp.watch('./src/scripts/*.js', {ignoreInitial: false}, gulp.series(comprimeJavaScript))
    gulp.watch('./src/images/*', {ignoreInitial: false}, gulp.series(comprimeImagens))
}