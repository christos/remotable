module Remotable
  @@framework = nil
  
  def self.javascript_framework=(framework)

    case framework.to_sym
    when :jquery
      ActionView::Helpers::AssetTagHelper.register_javascript_expansion :defaults => ['jquery', 'remotable']
    when :prototype
      ActionView::Helpers::AssetTagHelper.register_javascript_expansion :defaults => ['prototype', 'effects', 'dragdrop', 'controls', 'remotable']
    else
      puts "=> WARNING: Unknown Javascript framework #{framework.to_s}"
    end
    
    @@framework = framework
  end
  
  def self.javascript_framework
    @@framework
  end
  
end

module ActionView
  module Helpers
    module FormHelper
      def form_for_with_remotable(record_or_name_or_array, *args, &proc)
        options = args.extract_options!
        options[:html] ||= {}
        
        # TODO method should depend on record_or_name_or_array.new_record? ? ''
        options[:html].reverse_merge!(:'data-remote' => options[:remote]) unless options[:remote].blank?
        options[:html].reverse_merge!(:'data-method' => options[:method]) unless options[:method].blank?
        
        form_for_without_remotable(record_or_name_or_array, *(args << options), &proc)
      end 
      alias_method_chain :form_for, :remotable
    end
    
    module UrlHelper
      def link_to_with_remotable(*args, &block)
        options = args.extract_options!
        
        options.reverse_merge!(:'data-authenticity_token' => form_authenticity_token)  if protect_against_forgery?
        options.reverse_merge!(:'data-remote' => options.delete(:remote)) unless options[:remote].blank?
        options.reverse_merge!(:'data-method' => options.delete(:method)) unless options[:method].blank?
        
        link_to_without_remotable(*(args << options), &block)
      end
      alias_method_chain :link_to, :remotable
    end
  end
end

