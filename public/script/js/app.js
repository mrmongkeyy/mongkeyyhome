const template = {
	modal(config){return`
		<div id=head>
			<div id=title>${config.title||'undefined'}</div>
			<div>
				<span id=${config.id.one||'undefined'}>${config.text.one ||'undefined'}</span>
				<span id=${config.id.second||'undefined'}>${config.text.second||'undefined'}</span>
			</div>
		</div>
		<div id=content>
			
			
		</div>
	`},
	content(config){return `
		<span id=forimg>
			<img src=${config.thumbnail['0'].url}>
		</span>
		<span id=description>
			<div id=title>${config.title||'undefined'}</div>
			<div id=subdescription>
				${config.description||'undefined'}
			</div>
		</span>
		<div id=sfooter>
			--${config.author||'undefined'}, ${config.time||'undefined'}.
		</div>
	`},
	newProjectContent(){
		return `
			<div id=sideleft>
				<div id=pass>
					<span>Pass:</span>
					<span><input type=password placeholder=typeurpass...></span>
				</div>
				<div id=projectName>	
					<span>Name:</span>
					<span><input type=text placeholder=projectName...></span>
				</div>
			</div>
			<div id=sideright>
				<div id=thumbnail>
					<span>Thumbnail:</span>
					<span>
						<input type=file id=file accept='image/*'>
					</span>
				</div>
				<div id=preview>
					<span>Preview:</span>
					<span><img></span>
				</div>
			</div>
			<div id=description>
				<span>Description:</span>
				<span><textarea placeholder=typedescriptionhere...></textarea></span>
			</div>
		`;
	}
};

const init = function(){
	const nav = document.querySelectorAll('.nav');
	nav.forEach((div,i)=>{
		const dict  = {
			mainEl:get('#main'),
			contact(){
				//console.log('this is contact');
				const bound = makeElement('div');
				bound.id = 'boundaries';
				main.appendChild(bound);
				const modal = makeElement('div');
				modal.id = 'modalProject';
				modal.innerHTML = `
					<div id=contactModal>
						<div id=title>
							<span id=left>Contact Me On:</span>
							<span id=right>Close</span>
						</div>
						<div id=body>
							<div>
								<span id=left class=youtube>
									Email
								</span>
								<span id=right>
									./mrmongkeyy@gmail.com
								</span>
							</div>
							<div>
								<span id=left class=youtube>
									Youtube
								</span>
								<span id=right>
									./gemasaja
								</span>
							</div>
							<div>
								<span id=left class=twitter>
									Twitter
								</span>
								<span id=right>
									./@mrmongkeyy
								</span>
							</div>
							<div>
								<span id=left class=quora>
									Quora
								</span>
								<span id=right>
									./Mrmongkeyy
								</span>
							</div>
							<div>
								<span id=left class=instagram>
									Instagram
								</span>
								<span id=right>
									./@mrmongkeyy
								</span>
							</div>
							<div>
								<span id=left class=whatsapp>
									Whatsapp
								</span>
								<span id=right>
									./0895605801484
								</span>
							</div>
						</div>
					</div>
				`;
				modal.find('#title #right').onclick = function(){
					get('#boundaries').remove();
					get('#modalProject').remove();
				}
				main.appendChild(modal);
			},
			exit(){
				div.parentElement.style.display = 'none';
			},
			openmobilenavchoose(){
				div.parentElement.querySelector('#mobilenavchoose').style.display = 'block';
			},
			project(){

				const config = {
					address:'/projects',
					onload(response){
						const main = dict.mainEl;
						const bound = makeElement('div');
						bound.id = 'boundaries';
						main.appendChild(bound);
						const modal = makeElement('div');
						modal.id = 'modalProject';
						modal.innerHTML = template.modal({title:'List of the projects.',id:{one:'closebutton',second:'newproject'},text:{one:'close',second:'new'}});
						
						modal.find('#closebutton').onclick = function(){
							bound.remove();
							get('#modalProject').remove();
						}
						modal.find('#newproject').onclick = function(){
							bound.remove();
							get('#modalProject').remove();
							dict.newProject();
						}
						//content
						const data = JSON.parse(responseText(response));
						data.projects.forEach((data,index)=>{
							const contentout = makeElement('div');
							contentout.id = 'contentout';
							contentout.innerHTML = template.content(data);
							modal.find('#content').appendChild(contentout);
						})
						main.appendChild(modal);
					}
				}
				//make request.
				reQ.post(config);
			},
			newProject(){
				const IsThatU = prompt('Are u mrmongkeyy sir?','Yes/No');
				const showModal = function(){
					let fileUploaded = false,file;
					const modal = makeElement('div');
					modal.id = 'modalProject';
					modal.innerHTML = template.modal({
						title:'newProject',
						id:{one:'close',second:'save'},
						text:{one:'close',second:'save'}
					})
					//make body modal.
					const contentout = makeElement('div');
					contentout.id = 'newcontentout';
					contentout.innerHTML = template.newProjectContent();
					contentout.find('#file').onchange = function(){
						file = this.files[0];
						giveIMGsrc({el:get('#preview span img'),file})
					}
					modal.find('#save').onclick = function(){
						//console.log(UploadFile);
						if(file){
							UploadFile({file});
						}
					}
					modal.find('#close').onclick = function(){
						if(prompt('are you sure','yes/no').toLowerCase()==='yes'){
							get('#modalProject').remove();
							get('#boundaries').remove();
						}
					}
					modal.find('#content').appendChild(contentout);
					//makeboundaries
					const bound = makeElement('div');
					bound.id = 'boundaries';
					//event on page.
					let progress = 0;
					const UploadFile = function(config){
						sendFile({
							url:'/uploadFile',
							file:config.file,
							destination:'/public/media/',
							onload(res){
								progress += res.progressCount;
								get('#borderin').style.width = progress+'%';
								if(res.finish){
									get('#uploadProgress').remove();
									sendData({
										url:'/sendData',
										pass:'helloworld',
										data:fillData(contentout,res),
										onload(res){
											get('#boundaries').remove();
											get('#modalProject').remove();
										}
									})
								}
							}
						});
						const fillData = function(el,src){
							return {
								title:el.find('#projectName span input').value,
								description:el.find('#description span textarea').value,
								thumbnail:src.fileName,
								time:new Date().toLocaleString(),
								author:'mrmongkeyy'
							}
						}
						const modal = makeElement('div');
						modal.id = 'uploadProgress';
						modal.innerHTML = `
							<div id=title>Uploading...</div>
							<div id=progress>
								<div id=outborder>
									<span id=borderin>.</span>
								</div>
							</div>
						`;
						dict.mainEl.appendChild(modal);
					}
					this.main.appendChild(bound);
					this.main.appendChild(modal);
				}
				if(IsThatU.toLowerCase()==='yes')showModal();
			}
		}
		div.addEventListener('click',()=>{
			dict[div.id]();
		})
	})
};

init();