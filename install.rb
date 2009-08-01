puts "Copying files..."
post_install_files = {
  "generators/remotable/templates/remotable.js" => 'public/javascripts/remotable.js',
  'generators/remotable/templates/remotable.rb' => 'config/initializers/remotable.rb'
}

post_install_files.each do |src, dest|
  puts "Copying #{src.split('/').last} to #{File.join(RAILS_ROOT, dest)}"
  FileUtils.cp_r(File.join(File.dirname(__FILE__) , src), File.join(RAILS_ROOT, dest))
end
puts "Files copied - Installation complete!"