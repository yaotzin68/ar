var patterns;
var THREEx = THREEx || {};

THREEx.ArBaseControls = function(object3d){
	this.id = THREEx.ArBaseControls.id++

	this.object3d = object3d
	this.object3d.matrixAutoUpdate = false;
	this.object3d.visible = false

	// Events to honor
	// this.dispatchEvent({ type: 'becameVisible' })
	// this.dispatchEvent({ type: 'markerVisible' })	// replace markerFound
	// this.dispatchEvent({ type: 'becameUnVisible' })
}

THREEx.ArBaseControls.id = 0

//Object.assign( THREEx.ArBaseControls.prototype, THREE.EventDispatcher.prototype );

function generateObject(obj)
{
	var object = null;

	switch(obj.type)
	{
		case 'a-box':
			//object = generateBox(obj);
			break;

		case 'a-image':
			//object = generateImage(obj);
			break;

		case 'a-plane':
			//object = generatePlane(obj);
			break;

		case 'a-entity':
			//object = generateModel(obj);
			break;

		case 'text':
			object = generateText(obj);
			break;
	}

	return object;
}

function generateBox(obj)
{
	var object 	= document.createElement(obj.type);
	object.setAttribute("position"	, obj.position);
	object.setAttribute("material"	, obj.material);
	object.setAttribute("href"		, obj.url);
	object.setAttribute("target"	, obj.target);

	return object;
}

function addAsset(obj)
{
	var assets = document.getElementById("assets");

	if(assets!=null)
	{
		//assets.appendChild(obj);
		$('a-assets').append(obj);
	}
	else
	{
		$('a-assets').append(obj);
	}


}

function generateImage(obj)
{
	var id = Date.now();
	//<img id="my-image" src="images/test.jpg">
	var img 	= document.createElement('img');
	img.setAttribute("id"	, id);
	img.setAttribute("src"	, obj.srcImg);
	addAsset(img);

	var object 	= document.createElement(obj.type);
	//object.setAttribute("position"	, obj.position);
	//object.setAttribute("material"	, obj.material);
	object.setAttribute("src"		, "#"+id);
	object.setAttribute("href"		, obj.url);
	object.setAttribute("target"	, "_blank");

	return object;
}

function generatePlane(obj)
{
	var id 	= Date.now();
	var img	= document.createElement('img');
	img.setAttribute("id"	, id);
	img.setAttribute("src"	, obj.srcImg);
	addAsset(img);

	var object 	= document.createElement(obj.type);
	object.setAttribute("rotation"	, "-90 0 0");
	object.setAttribute("width"		, obj.width);
	object.setAttribute("height"	, obj.height);
	object.setAttribute("src"		, "#"+id);
	//object.setAttribute("href"		, obj.url);
	//object.setAttribute("target"	, obj.target);

	var button = generateButton(obj, parseFloat(obj.width) +.5);

	return [object].concat(button);

	//return object;
}

function generateModel(obj)
{
	//<a-entity obj-model="obj: #myModelObj; mtl: #myModelMtl" scale="0.1 0.1 0.1" href="#" target="_blank#rotation">
	//"obj"     : "models/knight.obj",
	//"mtl"     : "models/knight.mtl",
	//<a-animation id="boxout" attribute="rotation" from="0 0 0" to="0 -180 0" begin="href" dur="800" easing="ease-in-back"></a-animation>

	var idObj 	= 'obj'+Date.now();
	var idMtl 	= 'mlt'+Date.now();
	var ob		= document.createElement('a-asset-item');
	ob.setAttribute("id"	, idObj);
	ob.setAttribute("src"	, obj.obj);
	addAsset(ob);

	var mtl	= document.createElement('a-asset-item');
	mtl.setAttribute("id"	, idMtl);
	mtl.setAttribute("src"	, obj.mtl);
	addAsset(mtl);

	var object 	= document.createElement(obj.type);
	object.setAttribute("obj-model"	, "obj: #"+idObj+"; mtl: #"+idMtl);
	object.setAttribute("scale"		, obj.scale);
	//object.setAttribute("href"		, obj.url);
	//object.setAttribute("target"	, obj.target+"#anim");

	var animation 	= document.createElement("a-animation");
	animation.setAttribute("id"			, "anim");
	animation.setAttribute("attribute"	, "rotation");
	animation.setAttribute("from"		, "0 0 0");
	animation.setAttribute("to"			, "0 -180 0");
	animation.setAttribute("begin"		, "href");
	animation.setAttribute("dur"		, "800");
	animation.setAttribute("easing"		, "ease-in-back");

	object.appendChild(animation);

	var button = generateButton(obj,1);

	return [object].concat(button);


	//return object;
}

function generateText(obj)
{

	console.log(' */*/*/*/*/*/*/*/*/*/*/*/*/   generate text...');

	/*
	var object 	= document.createElement('a-entity');
	object.setAttribute("text-geometry"	, "value: "+obj.title+"; font: #optimerBoldFont; size:.1;");
	object.setAttribute("position"		, "0 0 0");
	object.setAttribute("rotation"		, "-90 0 0");
	object.setAttribute("material"		, "color:white;");*/

	var titulo	= document.createElement('a-entity');
	titulo.setAttribute("text"	, 		"width: 4; align:center; letterSpacing: 5; color: white; value: "+obj.title);
	titulo.setAttribute("position"		, "0 .2 -.5");
	titulo.setAttribute("rotation"		, "-90 0 0");

	var text	= document.createElement('a-entity');
	text.setAttribute("text"	, 		"width: .8; align:center; letterSpacing: 5; color: white; value: "+obj.text);
	text.setAttribute("position"		, "0 .2 -.3");

	text.setAttribute("rotation"		, "-90 0 0");

	var plane	= document.createElement('a-plane');
	plane.setAttribute("position"	, "0 0 0");
	plane.setAttribute("src"		, "#fondo");
	plane.setAttribute("width"		, "1");
	plane.setAttribute("height"		, "1");
	plane.setAttribute("rotation"	,"-90 0 0");


	//plane.setAttribute("href"		, obj.url);
	//plane.setAttribute("target"		, obj.target);

	//var button = generateButton(obj,1.7);

	//return [object,text,plane].concat(button);
	return [titulo,text,plane];

}

function generateButton(obj,pos)
{
	var object 	= document.createElement('a-plane');
	object.setAttribute("position"	, "-.3 -.3 "+pos);
	object.setAttribute("src"		, "#boton");
	object.setAttribute("title"		, "probando");
	object.setAttribute("width"		, "1");
	object.setAttribute("height"	, ".5");
	object.setAttribute("rotation"	, "-90 0 0");
	object.setAttribute("href"		, obj.url);
	object.setAttribute("target"	, "_blank");

	var object1	= document.createElement('a-entity');
	object1.setAttribute("text"	, 		"width: 3; align:center;color: white; value: Apunta aqui");
	object1.setAttribute("position"		, "-.3 -.25 "+pos);
	object1.setAttribute("rotation"		, "-90 0 0");

	return [object,object1];
}

function getJSON()
{
	//console.log('getJSON...');

	return new Promise((resolve, reject) =>{
		$.getJSON( "json/test.json", function( data )
		{
			//console.log(data);
			for(var pat in data)
			{
				if(data[pat].object)
				{
					var object 	= generateObject(data[pat].object);

					if(object!=null)
					{
						console.log('object',object);

						var aMarker = document.createElement("a-marker");
						aMarker.setAttribute("preset", data[pat].pattern);

						if(object[1])
						{
							for(var o in object)
							{
								aMarker.appendChild(object[o]);
							}
						}
						else
						{

							aMarker.appendChild(object);
						}

						var scene = document.getElementById("scene");
						//console.log('scene',scene);

						$('a-scene').append(aMarker);
					}
				}
				else
				{
					//console.log(data[pat].pattern)
					//console.log(data[pat].url,' ')
					//$('*[preset="'+data[pat].pattern+'"]').attr('href',data[pat].url)
				}

			}
			resolve(data);
		});
});
}

$(document).ready(function()
{
	console.log('ready...');
	if(patterns == undefined)
	{
		getJSON().then((data) =>
		{
			patterns = data;
			console.log(patterns);
			Object.assign( THREEx.ArBaseControls.prototype, THREE.EventDispatcher.prototype );

		});
	}
	else
	{
		//Object.assign( THREEx.ArToolkitContext.prototype, THREE.EventDispatcher.prototype );
	}

});

