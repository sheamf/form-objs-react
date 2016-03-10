FormObjsReact::Application.routes.draw do

  root 'companies#index'

  resources :companies

  get 'company_form/:id', to: 'companies#company_form', as: 'company_form'

end


