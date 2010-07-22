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
        raise ArgumentError.new('link_to only accepts the :get HTTP method. Use a button_to instead') if options[:method] && options[:method] != 'get'
        options.reverse_merge!(:'data-authenticity_token' => form_authenticity_token)  if protect_against_forgery?
        options.reverse_merge!(:'data-remote' => options.delete(:remote)) unless options[:remote].blank?
        options.reverse_merge!(:'data-method' => options.delete(:method)) unless options[:method].blank?
        
        link_to_without_remotable(*(args << options), &block)
      end
      alias_method_chain :link_to, :remotable
      
      def button_to(name, options = {}, html_options = {})
        html_options = html_options.stringify_keys
        convert_boolean_attributes!(html_options, %w( disabled ))

        method_tag = ''
        if (method = html_options.delete('method')) && %w{put delete}.include?(method.to_s)
          method_tag = tag('input', :type => 'hidden', :name => '_method', :value => method.to_s)
        end

        form_method = method.to_s == 'get' ? 'get' : 'post'

        request_token_tag = ''
        if form_method == 'post' && protect_against_forgery?
          request_token_tag = tag(:input, :type => "hidden", :name => request_forgery_protection_token.to_s, :value => form_authenticity_token)
        end

        if confirm = html_options.delete("confirm")
          html_options["onclick"] = "return #{confirm_javascript_function(confirm)};"
        end

        url = options.is_a?(String) ? options : self.url_for(options)
        name ||= url

        html_options.merge!("type" => "submit")

        data_remote = html_options.delete('remote')
        if (data_remote)
          "<form method=\"#{form_method}\" action=\"#{escape_once url}\"" +
          " data-remote=\"true\" data-method=\"#{method}\" class=\"button-to\"><div>" +
          method_tag + content_tag("button", name, html_options) + request_token_tag + "</div></form>"
          
        else
          "<form method=\"#{form_method}\" action=\"#{escape_once url}\" class=\"button-to\"><div>" +
          method_tag + content_tag("button", name, html_options) + request_token_tag + "</div></form>"
        end        
      end
    end
  end
end

