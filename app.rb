require 'sinatra'
require 'json'
require 'data_mapper'
require 'haml'
require 'rest-client'

get "/" do
  # File.read('./views/index.haml')
  # "All the best"

   haml :index
 end

 post '/movie' do
  # request.POST.inspect
   response = RestClient.get "http://www.omdbapi.com/?t=#{params['qry']}&y=&plot=short&r=json"
   response
 end

 get '/movie/:id'  do
 #response = HTTP.get("http://www.omdbapi.com/?i=#{x}&plot=full&r=json")
   #movie = HTTP.get("http://www.omdbapi.com/?i=#{params[:id]}&plot=full&r=json")

  res =  RestClient.get "http://www.omdbapi.com/?i=#{params[:id]}&plot=full&r=json"
   res


 end


 put 'favorites' do
  # saves a movie to favorites
   "done and dusted"
 end


get 'favorites' do
  response.header['Content-Type'] = 'application/json'
  File.read('data.json')
end

get '/favorites' do
  file = JSON.parse(File.read('data.json'))
  unless params[:name] && params[:oid]
    return 'Invalid Request'
  movie = { name: params[:name], oid: params[:oid] }
  file << movie
  File.write('data.json',JSON.pretty_generate(file))
  movie.to_json
end
end
