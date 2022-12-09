const view = {
	title:'change this!',
	settitle(titlename){this.title=titlename},
	module(array){
		let t = '';
		for(let i of array){
			t+=`<script src=${i}></script>`;
		}
		console.log(t);
		return t;
	},
	header(config){
		const setstyle = ()=>{
			if(config.style){
				if(config.style.link)return `<link href=${config.style.link} rel=stylesheet>`;
				else{
					return `
						<style>${config.style.scripts}</style>
					`;
				}
			}
		}
		return `
		<!doctype HTML>
		<head>
			<title>${config.title}</title>
			${setstyle()}
		</head>
		${this.module(config.module)}
	`},
	footer(scripts){
		//scripts param will be an array
		//akan digunakan apabila kita ingin menambahkan script pada document.
		let scripttext = '';
		scripts.forEach((script)=>{
			scripttext += `<script>${script}</script>`;
		});
		return scripttext;
	},
	home(config){
		//console.log('this is the data', config.aditional);
		return `
			${this.header(config.header)}
			<body>
				<div id=main>
					<div id=head>
						<div id=title><span><span class=white>mrmongkeyy</span>.show();</span></div>
						<nav id=desktopnav>
							<div class='nav' id=contact>
								<span>.contact()</span>
							</div>
							<div class='nav' id=project>
								<span>.projects()</span>
							</div>
						</nav>
						<nav id=mobilenav>
							<img src=${config.aditional['4'].media} class='nav cursorChangePointer' id=openmobilenavchoose>
							<div id=mobilenavchoose>
								<div class='cursorChangePointer nav' id=exit>.exit()</div>
								<div class='cursorChangePointer nav' id=contact>.contact()</div>
								<div class='cursorChangePointer nav' id=project>.project()</div>
							</div>
						</nav>
					</div>
					<div id=content>
						<div id=imgsecout>
							<div id=imgsec>
								<img src=${config.aditional['1'].media}>
							</div>
						</div>
						<div><span class='red fz-20s'>if(<span class=white>fail</span>)</span><span class='purple fz-20s'>return <span class=red>spirits(<span class=white>infinity</span>)</span>;</div>
						<div><span class=white>gema</span><span class=purple>.mrmongkeyy();</div>
						<div class="purple fz-20s">
							...gemasaja <span class="white fz-20s">"beautiful code make me happy";</span>
						</div>
						<div class="white fz-20s"><span class=red>Software Enginer</span>, <span class=aqua>Game Developer</span>, CEO of <span class="yellow">BananaStudio</span>.
						<br>Not really good at design.</div>
						<div id=copy>&copy 2022 mrmongkeyy All Rights Reserved.</div>
					</div>
				</div>
			</body>
			<script src='${config.aditional['2'].script.js.homescript}'></script>
		`;
	}
}
module.exports = view;