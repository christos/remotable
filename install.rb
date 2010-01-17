puts "The 'remotable' plugin requires the jQuery 1.4 library\n"
puts "If you want to use it with another Javascript library, or an earlier version of jQuery"
puts "please consult the README at github: http://github.com/christos/remotable\n"
puts "We are now going to install two support files into your Rails application..."

post_install_files = {
'generators/remotable/templates/remotable.jquery.js' => 'public/javascripts/remotable.js',
'generators/remotable/templates/remotable.jquery.rb' => 'config/initializers/remotable.rb'
}


post_install_files.each do |src, dest|
  puts "  Copying #{src.split('/').last} to #{File.join(RAILS_ROOT, dest)}"
  FileUtils.cp_r(File.join(File.dirname(__FILE__) , src), File.join(RAILS_ROOT, dest))
end
puts "  Done. Installation complete."