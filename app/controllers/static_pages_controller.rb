class StaticPagesController < ApplicationController
  # before_action :require_signed_in!, only: [:root]
  
  def about
    render :about
  end
  
  def contact
    render :contact
  end
  
  def root
    render :root
  end
end