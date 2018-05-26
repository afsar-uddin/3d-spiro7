window.onload = function() {
	var canvas = document.getElementById("canvas"),
		context = canvas.getContext("2d"),
		width = canvas.width = window.innerWidth,
		height = canvas.height = window.innerHeight,
		f1 = 300,
		points = [];
		numPoints = 200,
		centerZ = 3000,
		radius = 1000,
		baseAngle = 0,
		rotationSpeed = 0.01; 
		for( var i = 0; i < numPoints; i += 1 ) {
			var point = {
				angle: 0.2 * i,
				y: 2000 - 4000 / numPoints * i
			};
			point.x = Math.cos(point.angle + baseAngle) * radius;
			point.z = centerZ + Math.sin(point.angle + baseAngle) * radius;
			points.push(point);	
		}
		context.translate(width / 2, height / 2);

		document.body.addEventListener("mousemove", function(event) {
			rotationSpeed = (event.clientX - width / 2) * 0.00005;
			ypos = (event.clientY - height / 2) * 2;
		});

		update();

		function update() {
			baseAngle += rotationSpeed;
			context.clearRect(-width / 2, -height / 2, width, height);
			for( var i = 0; i < numPoints; i += 1 ) {
				var point = points[i],
					perspective = f1 / (f1 + point.z);

				context.save();
				context.scale(perspective, perspective);
				context.translate(point.x, point.y);

				context.scale(Math.sin(point.angle * baseAngle), 1);

				context.beginPath();
				context.arc(0, 0, 20, 0, Math.PI * 2, false);
				context.fill();

				context.restore();

				point.x = Math.cos(point.angle + baseAngle) * radius;
				point.z = centerZ + Math.sin(point.angle + baseAngle) * radius;
			}
			requestAnimationFrame(update);
		}
};