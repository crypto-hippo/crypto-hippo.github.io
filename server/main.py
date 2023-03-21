# Copyright 2018 Google LLC
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#     http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.

# [START gae_python37_app]
from flask import Flask, render_template, send_file, jsonify
from flask_cors import CORS
# from utility import load_blueprints
import os
import requests
import config
import xmltodict

def create_flask_app():
	new_app = Flask(__name__, template_folder="dist")
	new_app.config["SECRET_KEY"] = config.secret_key
	new_app.config["SESSION_TYPE"] = 'filesystem'
	CORS(new_app)
	# CORS(new_app, resources={r"/*": {"origins": "http://localhost:8080"}}, supports_credentials=True)
	# blueprints = load_blueprints()
	# for bp in blueprints:
	# 	new_app.register_blueprint(bp)
	return new_app


app = create_flask_app()

rss_urls = {
	"kubernetes": "https://kubernetes.io/feed.xml",
	"percona": "https://www.percona.com/blog/feed",
	"tinybird": "https://www.tinybird.co/blog-posts/rss.xml",
	"altinity": "https://altinity.com/feed"
}

@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def index(path):
	# return "Under construction"
	# print("path", path)
	return "rss feed api"


@app.route('/get_rss/<key>', methods=["GET"])
def get_rss(key):
	try:
		xml_feed = requests.get(rss_urls[key]).content
		obj = xmltodict.parse(xml_feed)
		return jsonify({"data": obj})
	except Exception as e:
		return jsonify({"data": {}})


@app.route('/css/<filename>')
def css(filename):
	return send_file(os.path.join(os.getcwd(), "dist/css/%s" % filename))


@app.route('/js/<filename>')
def js(filename):
	return send_file(os.path.join(os.getcwd(), "dist/js/%s" % filename))


@app.route('/img/<filename>')
def img(filename):
	return send_file(os.path.join(os.getcwd(), "dist/img/%s" % filename))


if __name__ == '__main__':
    # This is used when running locally only. When deploying to Google App
    # Engine, a webserver process such as Gunicorn will serve the app. This
    # can be configured by adding an `entrypoint` to app.yaml.
    app.run('0.0.0.0', debug=True)

# [END gae_python37_app]
